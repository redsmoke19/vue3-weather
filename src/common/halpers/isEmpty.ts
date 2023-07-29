const has = Object.prototype.hasOwnProperty;

export function isEmpty(val: unknown) {
  if (val == null) return true;

  if ("boolean" == typeof val) return false;

  if ("number" == typeof val) return val === 0;

  if ("string" == typeof val) return val.length === 0;

  if ("function" == typeof val) return val.length === 0;

  if (Array.isArray(val)) return val.length === 0;

  if (val instanceof Error) return val.message === "";

  if ((val as Record<string, unknown>).toString == toString) {
    switch ((val as Record<string, unknown>).toString()) {
      case "[object File]":
      case "[object Map]":
      case "[object Set]": {
        return (val as Map<string, unknown>).size === 0;
      }

      case "[object Object]": {
        for (const key in val as Record<string, unknown>) {
          if (has.call(val, key)) return false;
        }

        return true;
      }
    }
  }
  return false;
}
