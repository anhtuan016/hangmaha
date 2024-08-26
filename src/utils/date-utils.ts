import { format } from "date-fns";

export const getCurrentDateTime = (pattern: string = 'dd-MM-yyyy-HH-mm-ss') => {
  return format(new Date(), pattern);
};
