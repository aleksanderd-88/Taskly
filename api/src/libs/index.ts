import every from 'lodash/every'
import values from 'lodash/values'
import isEmpty from 'lodash/isEmpty'

export const requestIsValid = (data: Record<string, unknown>) => !isEmpty(data) && every(values(data))