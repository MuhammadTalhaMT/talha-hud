local bankMoney = 0
local handMoney = 0
local blackMoney = 0
local coinss = 0
local societymoney = 0
local hide = false

ESX = exports["es_extended"]:getSharedObject()

CreateThread(function()
	while ESX.GetPlayerData().job == nil do Wait(100) end
	ESX.PlayerData = ESX.GetPlayerData()
end)

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer)
  ESX.PlayerData = xPlayer
  PlayerLoaded = true
end)

RegisterNetEvent('esx:setJob')
AddEventHandler('esx:setJob', function(job)
  ESX.PlayerData.job = job
end)
-- Function to update money values
function UpdateMoneyValues()
    ESX.TriggerServerCallback('getMoneyValues', function(bank, hand, black)
        bankMoney = bank
        handMoney = hand
        blackMoney = black
        coinss = coins
        if not isPaused or not hide then
            SendNUIMessage({
                type = 'update_money',
                bank = bankMoney,
                hand = handMoney,
                black = blackMoney,
            })
        end
    end)
end

function UpdateJob()
    ESX.TriggerServerCallback('getJobValues', function(jobName, gradeName)
        name = jobName
        grade = gradeName
        if not isPaused or not hide then
            SendNUIMessage({
                type = 'update_job',
                name = name,
                grade = grade
            })
        end
    end)

end

-- Main HUD drawing function
function UpdateServerInfo(playerId)
    SendNUIMessage({
        type = 'update_server_info',
        playerId = playerId
    })
end

local playerId = PlayerId()
local serverId = GetPlayerServerId(playerId)

-- Main HUD drawing function
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(5000)
        UpdateServerInfo(serverId)
        UpdateMoneyValues()
        if ESX.PlayerData.job then    
            UpdateJob() 
            if ESX.PlayerData.job.grade_name ~= nil and ESX.PlayerData.job.grade_name == 'boss' then 
                ESX.TriggerServerCallback('esx_society:getSocietyMoney', function(money)
                    societymoney = money
                    SendNUIMessage({
                        type = 'update_money2',
                        society = societymoney
                    })
                    SendNUIMessage({
                        type = 'showSociety',
                    })
                end, ESX.PlayerData.job.name)
            else
                SendNUIMessage({
                    type = 'hideSociety',
                })
            end
        end
    end
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1000)
        if IsPauseMenuActive() then
            isPaused = true
            SendNUIMessage({
                type = 'hide_hud'
            })
        else
            if isPaused then
                isPaused = false
                SendNUIMessage({
                    type = 'show_hud'
                })
            end
            UpdateMoneyValues()
        end
    end
end)

RegisterCommand('togglehud', function(source)

    if hide then 
        SendNUIMessage({
           type = 'show_hud'
        })
        hide = false
    else 
        SendNUIMessage({
            type = 'hide_hud'
        })    
        hide = true
    end
end)