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
