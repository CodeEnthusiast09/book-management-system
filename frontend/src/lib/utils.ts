const parseInputDate = (input: string): Date => {
  const [datePart] = input.split(" ");
  const [day, month, year] = datePart?.split("-") || [];

  // Ensure the date string is in the "yyyy-mm-dd" format
  const formattedDateString = `${year}-${month}-${day}`;

  return new Date(formattedDateString);
};

export const formatDate = (date: string | undefined) => {
  if (!date || date.toString() === "") return "-";

  // check if date.split is a function
  if (typeof date.split !== "function") return date;

  const inputDate =
    date?.split("-")[0]?.length === 4 ? new Date(date) : parseInputDate(date);

  return inputDate.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const convertCamelKeysToSnakeCase = (
  value: any,
  option = { convertString: false }
): any => {
  if (Array.isArray(value)) {
    return value?.map((item) => convertCamelKeysToSnakeCase(item));
  } else if (typeof value === "object" && value !== null) {
    return Object?.keys(value)?.reduce((acc, key) => {
      const snakeKey = key?.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
      // @ts-ignore
      acc[snakeKey] = convertCamelKeysToSnakeCase(value[key]);
      return acc;
    }, {});
  } else if (typeof value === "string" && option?.convertString) {
    const snakeKey = value?.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
    return snakeKey;
  } else {
    return value;
  }
};

export const convertSnakeCaseKeysToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertSnakeCaseKeysToCamelCase(item));
  } else if (typeof obj === "object" && obj !== null) {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/_./g, (match) =>
        match.charAt(1).toUpperCase()
      );

      // @ts-ignore
      acc[camelKey] = convertSnakeCaseKeysToCamelCase(obj[key]);
      return acc;
    }, {});
  } else {
    return obj;
  }
};
