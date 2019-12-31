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

const Enzyme = requireWithContext('enzyme')
const Adapter = requireWithContext('enzyme-adapter-react-16')

require('jest-enzyme')
require('jest-extended')

Enzyme.configure({ adapter: new Adapter() })

global.React = requireWithContext('react')
