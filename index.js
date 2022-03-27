const telegramApi = require('node-telegram-bot-api');
const { timeout } = require('nodemon/lib/config');
const command = require('nodemon/lib/config/command');
const { src } = require('prettier/doc');
const token = '5120966527:AAHBhXKuBmAIOJiyzPo4ifyyhvY65YWmIgo';
const bot = new telegramApi(token, {polling: true});
// const { meessageJS } = require('/messageJS.js');

const menuKey = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Заправился⛽️', callback_data: '/fuel'},
            {text: 'Прибыл', callback_data: '/in'},
            {text: 'Вышел', callback_data: '/out'}],
            [{text: 'Старт', callback_data: '/start'},
            {text: 'Информация', callback_data: '/info'}]
        ]
    }),
};

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Старт'},
        {command: '/info', description: 'Информация о пользователе'},
        {command: '/out', description: 'Выход'},
        {command: '/in', description: 'Прибытие'},
        {command: '/fuel', description: 'Заправка'},
    ]);

    bot.on ('message', msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        let newDate = new Date().toLocaleTimeString(), newDateConsole = new Date();
        let h = (new Date()).getHours();
        let name = `${msg.from.first_name} ${msg.from.last_name}`;

        if(text === '/start') {
            return bot.sendMessage(chatId, 'доброго времени суток, ' + name + '👋' + ' Этот бот предназначен для удобного отправления отчётов' +'. Для управления ботом используйте кнопки или меню.', menuKey),
            console.log(msg, newDateConsole, newDate);
        };
    
        if(text === '/info'){
           return bot.sendMessage(chatId, name + '.'),
           console.log(msg, newDateConsole, newDate);
        };

        if(text === '/out'){
            return bot.sendMessage(chatId, name +`, вы отправились в ` + newDate + '.'),
            console.log(msg, newDateConsole, newDate);
        };

        if(text === '/in'){
            return bot.sendMessage(chatId, name +`, вы прибыли в ` + newDate + '.'),
            console.log(msg, newDateConsole, newDate);
        };

        if(text === '/fuel'){
            return bot.sendMessage(chatId, name +`, вы заправились в ` + newDate + '. Пожалуйста укажите объём в литрах. Введите число в поле для ввода сообщения.'),
            console.log(msg, newDateConsole, newDate);
        };
        if(text){
            return bot.sendMessage(chatId, 'Принял' + '👍'),
            console.log(msg, newDateConsole, newDate);
        }

        if(text){
            return bot.sendMessage(chatId, 'Используйте кнопки или команды меню!')
        }
    
    });
};

bot.on('callback_query', msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    let newDate = new Date().toLocaleTimeString(), newDateConsole = new Date();
    let h = (new Date()).getHours();
    let name = `${msg.from.first_name} ${msg.from.last_name} `;

    if(data === '/fuel'){
        return bot.sendMessage(chatId, name +`, вы заправились в ` + newDate + '. Пожалуйста укажите объём в литрах. Введите число в поле для ввода сообщения.'),
        console.log(msg, newDateConsole, newDate);
    }

    if(data === '/in'){
        return bot.sendMessage(chatId, name +`, вы прибыли в ` + newDate + '.'),
        console.log(msg, newDateConsole, newDate);
    }

    if(data === '/out'){
        return bot.sendMessage(chatId, name +`, вы отправились в ` + newDate + '.'),
        console.log(msg, newDateConsole, newDate);
    }

    if(data === '/start'){
        return bot.sendMessage(chatId, 'доброго времени суток, ' + name + ' Этот бот предназначен для удобного отправления отчётов' +'. Для управления ботом используйте кнопки или меню.', menuKey),
        console.log(msg, newDateConsole, newDate);
    }

    if(data === '/info'){
        return bot.sendMessage(chatId, name + '.'),
        console.log(msg, newDateConsole, newDate);
    }
});
start();