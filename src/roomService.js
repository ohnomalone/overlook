class RoomService {
  constructor(roomServiceData) {
    this.roomServiceData = this.changeTimeFormat(roomServiceData)
    this.getRoomServiceMenu;
  }

  changeTimeFormat(hotelData) {
    return hotelData.map(item => {
      const newDateFormat = new Date(item.date)
      item.date = newDateFormat.getTime();
      return item
    })
  }

  getRevenueFromRoomservice(date) {
    return this.getRoomService(date).reduce((totalRevenue, item) => {
      return totalRevenue += item.totalCost
    }, 0)
  }

  getRoomService(date) {
    return this.roomServiceData.filter(item => item.date === date)
  }

  getCustomersRoomServiceAllTime(currentCustomer) {
    console.log('LINE 27 getCustomersRoomServiceAllTime')
    return this.roomServiceData.filter(item => item.userID === currentCustomer.id)
  }

  getTotalSpendOnRoomService(currentCustomer) {
    console.log('LINE 32 getTotalSpendOnRoomService')
    return this.getCustomersRoomServiceAllTime(currentCustomer).reduce( (total, meal) => {
      return total += meal.totalCost
    }, 0)
  }

  getCustomerRoomSeriveForASpecificDay(currentCustomer, date) {
    return this.roomServiceData.filter(item => item.userID === currentCustomer.id)
  }

  getRoomServiceMenu() {
    const roomService = this.roomServiceData.reduce( (acc, order) => {
      if (!acc[order.food]) {
        acc[order.food] = order.totalCost
      }
      return acc
    }, {})
    const roomServiceKeys = Object.keys(roomService)
    const roomServiceValues = Object.values(roomService)
    const menu = roomServiceKeys.map( (item, i) => {
      return { food: item, totalCost: roomServiceValues[i]}
    })
    this.getRoomServiceMenu = menu;
    return menu
  }

  createOrderOptions() {
    return this.getRoomServiceMenu.map(item => {
      return `<option value="${item.food}" class="${item.totalCost}">${item.food}</option>`
    })
  }

  newRoomServiceOrder(foodItem, currentCustomer, dateToday) {
    const foodPrice = this.getFoodItemPrice(foodItem)
    const newOrder = {
      userID: parseInt(currentCustomer.id),
      date: dateToday,
      food: foodPrice.food,
      totalCost: parseFloat(foodPrice.totalCost)
    }
    this.roomServiceData.push(newOrder)
    return newOrder
  }

  getFoodItemPrice(foodItem){
    return this.getRoomServiceMenu.find( item => item.food === foodItem)
  }
}

export default RoomService