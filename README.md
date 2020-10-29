# Configs

NPM: https://www.npmjs.com/package/@consta/widgets-configs

## Обновление версии и публикация пакета

Обновлять версию пакета нужно строго через `npm version (major | minor | patch | ...)` и в `master` ветке. Публикация пакета происходит автоматически при отправке нового тега в мастер.

```sh
> npm version patch
> git push origin master --follow-tags
```

## Подключение без публикации

Обычно для подключения пакета без публикации можно использовать `yarn link`

Для локального тестирования совместимости с другими проектами стоит использовать утилиту [Yalc](https://github.com/whitecolor/yalc)
1. `Yalc` можно установить глобально или использовать без установки с помощью [npx](https://www.npmjs.com/package/npx)
2. Опубликовать пакет локально ``yalc publish``
3. Перейти в корневую директорию проекта в который хотим добавить локальный пакет
4. Локально подключить пакет в проект `yalc link @consta/widgets-configs --yarn` или `yalc add @consta/widgets-configs --yarn`
