export const notify = (
  title,
  message,
  url = 'https://www.cowin.gov.in/home'
) => {
  const notification = new Notification(title, {
    body: message,
    icon: `${window.location.origin}/favicon.ico`
  });
  notification.onclick = () => window.open(url);
};

export const encode = (decodedString) => {
  try {
    const buff = Buffer.from(decodedString, 'utf-8');
    const base64EncodedString = buff.toString('base64');
    return base64EncodedString;
  } catch (e) {
    return '';
  }
};

export const decode = (base64EncodedString) => {
  try {
    const buff = Buffer.from(base64EncodedString, 'base64');
    const decodedString = buff.toString('utf-8');
    return decodedString;
  } catch (e) {
    return '';
  }
};
