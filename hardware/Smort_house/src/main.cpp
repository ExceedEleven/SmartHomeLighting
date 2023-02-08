#include <Arduino.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "connect.h"
#define green 25
#define red 27
#define yellow 26
#define red_btn 2 //white
#define green_btn 0//purple
#define yellow_btn 13 //brown
#define ldr 32
bool is_auto[3];
bool is_on[3];
int brightness[3];

int status_red = 0, status_green = 0, status_yellow = 0; //0 : off , 1: on

int touch_red = 0, touch_yellow = 0, touch_green = 0;
int current_touch_red =0 ,current_touch_yellow = 0, current_touch_green = 0;

TaskHandle_t task1 = NULL;
TaskHandle_t task2 = NULL;
TaskHandle_t task3 = NULL;

void Post_light(bool au[3], int br[3], bool on[3], int i){
    DynamicJsonDocument doc_post(2048);
    HTTPClient http;
    String url = baseUrl + "/";
    http.begin(url);
    http.addHeader("Content-Type", "application/json");

    String json;
    //0

        doc_post["room_id"] = i;
        doc_post["is_auto"] = au[i];
        doc_post["brightness"] = br[i];
        doc_post["is_on"] = on[i];
        serializeJson(doc_post,json);
        Serial.println(json);
        httpResponseCode = http.PUT(json);
        if (httpResponseCode == 200)
        {
            Serial.println("Done");
            Serial.println("");
        }
        else
        {
            Serial.print("Error ");
            Serial.println(httpResponseCode);
        }
        vTaskDelay(100/portTICK_PERIOD_MS);
    
  
}

void ldr_auto(void* param)
{
  while (1)
  {
    int ldr_reading = analogRead(ldr);
    Serial.println(ldr_reading);
    for (int i=0; i<3; i++)
    {
      if (is_auto[i])
      {
        if (ldr_reading < 2500 && is_on[i] == false)
        {
          is_on[i] = true;
          ledcWrite(i,255);
          brightness[i] = 255;
           Post_light(is_auto, brightness, is_on, i);
          Serial.println("open");
        }
        else if (ldr_reading >= 2500 && is_on[i] == true)
        {
          is_on[i] = false;
          ledcWrite(i,0);
          brightness[i] = 0;
          Serial.println("close");
           Post_light(is_auto, brightness, is_on,i);
        }
      }     
    }
    
   
    vTaskDelay(500/portTICK_PERIOD_MS);
  }
}

//manual function
void click(int led,int brightness,int &status)
{
  if (!status)
  {
    ledcWrite(led,brightness);
    Serial.println("XD");
    status = 1;
  }
  else if (status)
  {
    ledcWrite(led,0);
    status =0 ;
  }
}
void btn_fell(int btn,int led, int brightness)
{
    if (led == red)
    {
        vTaskDelay(25/portTICK_PERIOD_MS);
        current_touch_red = touchRead(btn);
        Serial.println(current_touch_red - touch_red);
        if (current_touch_red - touch_red < -15)
          click(0,brightness,status_red);
        touch_red = current_touch_red;
    }
    else if (led == yellow)
    {
        vTaskDelay(25/portTICK_PERIOD_MS);
        current_touch_yellow = touchRead(btn);
        Serial.println(current_touch_yellow - touch_yellow);
        if (current_touch_yellow - touch_yellow < -15)
          click(1,brightness,status_yellow);
        touch_yellow = current_touch_yellow;
    }
    else if (led == green)
    {
        vTaskDelay(25/portTICK_PERIOD_MS);
        current_touch_green = touchRead(btn);
        Serial.println(current_touch_green - touch_green);
        if (current_touch_green - touch_green < -15)
          click(2,brightness,status_green);
        touch_green = current_touch_green;
    }
}

void control(void* param)
{
  while (1)
  {
    DynamicJsonDocument doc(2048);
    Get_light(doc);
    for (int i=0; i<3; i++)
    {
      is_auto[i] = doc["result"][i]["is_auto"].as<bool>();
      is_on[i] = doc["result"][i]["is_on"].as<bool>();
      brightness[i] = doc["result"][i]["brightness"].as<int>();
    }
    

    vTaskDelay(1000/portTICK_PERIOD_MS);
    doc.clear();
  }
}
void setup() {
  Serial.begin(115200);
  ledcSetup(0,5000,8);
  ledcSetup(1,5000,8);
  ledcSetup(2,5000,8);
  ledcAttachPin(red,0);
  ledcAttachPin(yellow,1);
  ledcAttachPin(green,2);
  

  Connect_WiFi();
  xTaskCreatePinnedToCore(control, "get all json data and control", 30000, NULL, 1, &task1, 1);
  xTaskCreatePinnedToCore(ldr_auto,"auto mode", 10000,NULL, 1, &task2, 0);

}


void loop() {
  //leave blank
}