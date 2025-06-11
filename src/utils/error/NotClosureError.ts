// Extend the ErrorConstructor interface to include captureStackTrace
interface NodeErrorConstructor extends ErrorConstructor {
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  captureStackTrace(targetObject: object, constructorOpt?: Function): void;
}
export class NotClosureError extends Error {
  public readonly code: number;
  public readonly details?: Record<string, any>;

  constructor(message: string, code: number, details?: Record<string, any>) {
    // 調用父類的構造函數，傳遞錯誤訊息
    super(message);

    // 設置錯誤名稱為自訂義類別名稱
    this.name = this.constructor.name;

    // 設置自訂義屬性
    this.code = code;
    this.details = details;

    // 確保錯誤堆棧正確生成（TypeScript 需要顯式設置）
    if ((Error as NodeErrorConstructor).captureStackTrace) {
      (Error as NodeErrorConstructor).captureStackTrace(this, this.constructor);
    }
  }
}
