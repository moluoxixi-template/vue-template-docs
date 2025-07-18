/**
 * 当没有下一个输入元素时触发的事件参数
 */
export interface NoNextInputParams {
  /**
   * 当前行数据
   */
  row: any
  /**
   * 行索引
   */
  rowIndex: number
  /**
   * 列索引
   */
  colIndex: number
}

/**
 * 当select下拉为空时触发的事件参数
 */
export interface NoSelectValueParams {
  /**
   * 当前行数据
   */
  row: any
  /**
   * 行索引
   */
  rowIndex: number
  /**
   * 列索引
   */
  colIndex: number
}
