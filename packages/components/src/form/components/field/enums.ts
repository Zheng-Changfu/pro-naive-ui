export enum ValueTypeEnum {
  RATE = 'rate',
  INPUT = 'input',
  DIGIT = 'digit',
  SLIDER = 'slider',
  SWITCH = 'switch',
  UPLOAD = 'upload',
  SELECT = 'select',
  MENTION = 'mention',
  CASCADER = 'cascader',
  PASSWORD = 'password',
  TEXTAREA = 'textarea',
  CHECKBOX = 'checkbox',
  TRANSFER = 'transfer',
  PROGRESS = 'progress',
  TREE_SELECT = 'tree-select',
  RADIO_GROUP = 'radio-group',
  COLOR_PICKER = 'color-picker',
  DYNAMIC_TAGS = 'dynamic-tags',
  AUTO_COMPLETE = 'auto-complete',
  CHECKBOX_GROUP = 'checkbox-group',

  DATE = 'date',
  TIME = 'time',
  DATE_TIME = 'date-time',
  DATE_YEAR = 'date-year',
  DATE_WEEK = 'date-week',
  DATE_MONTH = 'date-month',
  DATE_RANGE = 'date-range',
  DATE_QUARTER = 'date-quarter',
  DATE_TIME_RANGE = 'date-time-range',
  DATE_YEAR_RANGE = 'date-year-range',
  DATE_MONTH_RANGE = 'date-month-range',
  DATE_QUARTER_RANGE = 'date-quarter-range',

  FORM_LIST = 'form-list',
  EDIT_DATA_TABLE = 'edit-data-table',
}

/**
 * 留给外面方便扩展自定义类型
 */
export type FieldValueType = `${ValueTypeEnum}`
