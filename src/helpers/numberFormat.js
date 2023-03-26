// функция для форматирования цены, пробелы после трех цифр
export default function numberFormat(value) {
  return new Intl.NumberFormat().format(value);
}
