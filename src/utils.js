/* генерация чисел (1,2,4,8,16,32,64.....) с сохранением значения */
export const generateExpiredTasks = (() => {
  let count = 0;

  return () => {
    if(!count){
      return ++count
    }
    return count *= 2
  }
})();

/* форматирование даты: 24/10/2018 */
export const getHistoryDate = newTime => {
  const formatDate = (date, m = undefined) => {
    const d = m ? String(date + 1) : String(date);
    return (
      d.length > 1 ?
        (d) :
        `0${d}`
    )
  };
  const date = new Date(newTime);
  const day = formatDate(date.getDate());
  const month = formatDate(date.getMonth(), true);
  const year = formatDate(date.getFullYear());

  return `${day}/${month}/${year}`
};