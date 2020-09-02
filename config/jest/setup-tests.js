/**
 * Определяем директорию в которой вызвали запуск тестов. Это необходимо
 * если текущий модуль используется через `npm link` / `yarn link`.
 */
const CONTEXT = `${process.cwd()}/node_modules/`

/**
 * Добавляем новый вид require для получения доступа к модулям проекта
 * использующего эту конфигурацию.
 */
const requireWithContext = (moduleName) => require(CONTEXT + moduleName)

require('jest-extended')

global.React = requireWithContext('react')
global.TestRenderer = requireWithContext('react-test-renderer')
global.TestLibrary = requireWithContext('@testing-library/react')
global.TestMocked = require('ts-jest/utils').mocked
