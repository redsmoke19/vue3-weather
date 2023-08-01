const has = Object.prototype.hasOwnProperty;

export function isEmpty(val) {
  if (val == null) return true;

  if ("boolean" == typeof val) return false;

  if ("number" == typeof val) return val === 0;

  if ("string" == typeof val) return val.length === 0;

  if ("function" == typeof val) return val.length === 0;

  if (Array.isArray(val)) return val.length === 0;

  if (val instanceof Error) return val.message === "";

  if (val.toString === toString) {
    switch (val.toString()) {
      case "[object File]":
      case "[object Map]":
      case "[object Set]": {
        return val.size === 0;
      }

      case "[object Object]": {
        for (const key in val) {
          if (has.call(val, key)) return false;
        }

        return true;
      }
    }
  }
  return false;
}
