import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) =>  state.notification)
  console.log("notification",notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    textAlign: 'center',
  }
  if (notification) {
  return (
    <div style={style}>
      <p>{notification}</p>
    </div>
  )}
}

export default Notification