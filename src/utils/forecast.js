const request=require('request')

const forecast=(lattitude,longitude,callback)=>{
    const url= `https://api.darksky.net/forecast/938ee2bd3200d31510666807f7dbc5bb/${lattitude},${longitude}?units=si`
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to weather service')
        }else if(body.error){
            callback('Unable to find given location')
        }else{
            callback(undefined,`${body.daily.data[0].summary} Temperature is ${body.currently.temperature} degree celsius and there is ${body.currently.precipProbability*100}% chance of rain`)
        }
    })
}

module.exports=forecast