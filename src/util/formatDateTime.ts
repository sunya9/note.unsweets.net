import { format } from "date-fns";
import { ja } from "date-fns/locale";

export const formatDate = (date: Date | number) =>
  format(date, "P", {
    locale: ja,
  });

export const formatTime = (date: Date | number) =>
  format(date, "p", {
    locale: ja,
  });
