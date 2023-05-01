export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const day = date.getDate();
  let suffix = 'th';
  if (day === 1 || day === 21 || day === 31) {
    suffix = 'st';
  } else if (day === 2 || day === 22) {
    suffix = 'nd';
  } else if (day === 3 || day === 23) {
    suffix = 'rd';
  }
  return `${date.toLocaleDateString('en-US', options).split(',')[0]} ${day}${suffix} of ${date.toLocaleDateString('en-US', { month: 'long' })} ${date.getFullYear()}`;
};