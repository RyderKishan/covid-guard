export const notify = (
  title,
  message,
  url = 'https://www.cowin.gov.in/home'
) => {
  const notification = new Notification(title, {
    body: message
  });
  notification.onclick = () => window.open(url);
};

export const dataa = (
  title,
  message,
  url = 'https://www.cowin.gov.in/home'
) => {
  const notification = new Notification(title, {
    body: message
  });
  notification.onclick = () => window.open(url);
};
