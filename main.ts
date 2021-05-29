ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("Broeknet", "B1vidhd10idl")
OLED.init(128, 64)
if (ESP8266_IoT.wifiState(true)) {
    basic.showString("Online")
}
basic.forever(function () {
    OLED.clear()
    OLED.writeStringNewLine("Dust (ug/m3):")
    OLED.writeNum(Environment.ReadDust(DigitalPin.P13, AnalogPin.P1))
    basic.pause(60000)
})
