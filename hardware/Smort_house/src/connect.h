#include <Arduino.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include <ArduinoJson.h>

const String baseUrl = "https://ecourse.cpe.ku.ac.th/exceed11";
const char* ssid = "Jtb";
const char* password = "zlsq1912";
int  httpResponseCode;
void Connect_WiFi()
{
    WiFi.begin(ssid, password);
    Serial.print("connecting to Wifi");
    while (WiFi.status() != WL_CONNECTED)
    {
        vTaskDelay(500/portTICK_PERIOD_MS);
        Serial.print(".");
    }
    Serial.print("OK! IP=");
    Serial.println(WiFi.localIP());
    Serial.println("-----------------------");
}   

void Get_light(DynamicJsonDocument &doc){
    HTTPClient http;
    String url = baseUrl + "/";
    http.begin(url);

    int httpRespondCode = http.GET();
    if(httpRespondCode >= 200 && httpRespondCode<300){
        String payload = http.getString();
        deserializeJson(doc, payload);
        Serial.print(doc["result"][1]["room_id"].as<int>());
        Serial.println(payload);
    } else{
    Serial.print("Error ");
    Serial.println(httpRespondCode);
    }

    Serial.println("----------------------------------");
}

// void Post_light(bool au[3], int br[3], bool on[3]){
//     DynamicJsonDocument doc_post(2048);
//     HTTPClient http;
//     String url = baseUrl + "/";
//     http.begin(url);
//     http.addHeader("Content-Type", "application/json");

//     String json;
//     //0
//     for (int i=0; i<3; i++)
//     {
//         doc_post["room_id"] = i;
//         doc_post["is_auto"] = au[i];
//         doc_post["brightness"] = br[i];
//         doc_post["is_on"] = on[i];
//         serializeJson(doc_post,json);
//         Serial.println(json);
//         httpResponseCode = http.PUT(json);
//         if (httpResponseCode == 200)
//         {
//             Serial.println("Done");
//             Serial.println("");
//         }
//         else
//         {
//             Serial.print("Error ");
//             Serial.println(httpResponseCode);
//         }
//         vTaskDelay(100/portTICK_PERIOD_MS);
//     }
    
// }

