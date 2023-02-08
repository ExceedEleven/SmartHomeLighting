#include <Arduino.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include <ArduinoJson.h>

const String baseUrl = "Going to be add";
const char* ssid = "Jtb";
const char* password = "zlsq1912";

void Connect_Wifi()
{
    WiFi.begin(ssid, password);
    Serial.print("connecting to Wifi");
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.print("OK! IP=");
    Serial.println(WiFi.localIP());
    Serial.println("-----------------------");
}   

void Get(DynamicJsonDocument &doc){
    HTTPClient http;
    const String url = baseUrl + "/";
    http.begin(url);

    int httpRespondCode = http.GET();
    if(httpRespondCode >= 200 && httpRespondCode<300){
        String payload = http.getString();
        deserializeJson(doc, payload);
        //Do somethng something here

    } else{
    Serial.print("Error ");
    Serial.println(httpRespondCode);
    }

    Serial.println("----------------------------------");
}

void Post(){
    HTTPClient http;
    const String url = baseUrl + "/";
}