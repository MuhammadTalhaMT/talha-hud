-- ESX Callback to get money values

ESX = exports["es_extended"]:getSharedObject()

ESX.RegisterServerCallback('getMoneyValues', function(source, cb)
  
  local xPlayer = ESX.GetPlayerFromId(source)
 
  if xPlayer ~= nil then
    cb(xPlayer.getAccount('bank').money, xPlayer.getMoney(), xPlayer.getAccount('black_money').money)
  end 
end)


ESX.RegisterServerCallback('getJobValues', function(source, cb)
  
  local xPlayer = ESX.GetPlayerFromId(source)
  
  if xPlayer ~= nil then
    cb(xPlayer.getJob().label, xPlayer.getJob().grade_label)
  end 
end)
