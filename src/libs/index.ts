import values from 'lodash/values'
import every from 'lodash/every'

export const fieldIsEmpty = (object: Record<string, unknown>) => !every(values(object))