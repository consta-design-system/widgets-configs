# Configs

## Установка пакета

Для работы с пакетом:
1. Получаем токен в [GH Developer settings](https://github.com/settings/tokens/new). Нужно отметить `read:packages` и `write:packages`.
2. Авторизуемся из личной директории (из директории проекта не получится) здесь:

```
npm login --registry=https://npm.pkg.github.com
```
Используем логин от вашего github-аккаунта, а в качестве пароля - токен из п. 1

## Обновление версии и публикация пакета

Обновлять версию пакета нужно строго через `npm version (major | minor | patch | ...)` и в `master` ветке. Публикация пакета происходит автоматически при отправке нового тега в мастер.

```sh
> npm version patch
> git push origin master --follow-tags
```

## Подключение без публикации

Обычно для подключения пакета без публикации можно использовать `yarn link`
