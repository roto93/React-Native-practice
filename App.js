// hw7 API

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Image, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal'
import Ionicon from 'react-native-vector-icons/Ionicons'


export default function App() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showNationModal, setShowNationModal] = useState(false);
  const [month, setMonth] = useState('12');
  const [day, setDay] = useState('31');
  const [dateObj, setDateObj] = useState(new Date()); //用來儲存上一次選擇的日期，才不會每次都從2019年最後一天開始選
  const [currency, setCurrency] = useState('USD');
  const [buyIn, setBuyIn] = useState(0);
  const [sellOut, setSellOut] = useState(0);
  const [reducedData, setReducedData] = useState([]);   //wasn't using useState to handle reducedData, suffered for hours. Should notice more about lifecycle.

  const fetchData = () => {
    const data_URL = 'https://www.bot.com.tw/Govinfo/opendata/csv/151/20190101-20191231-FXCRT.csv'
    fetch(data_URL)
      .then(res => res.text())
      .then(data => {
        let splittedData = data.split('\n')         //把string轉換成array, 遇到換行拆解成一個元素
        let splittedRow = splittedData.map((row) => {     // 把每個元素中的內容再用逗號拆解
          return row.split(',')
        })
        setReducedData(splittedRow)
      })
      .catch(err => console.error(err))
  }
  const DateHandler = {
    onChange: (date) => {
      setShowDatePicker(false)
      let m = date.getMonth() + 1
      let d = date.getDate()
      setDateObj(new Date(2019, m - 1, d))
      m.toString().length == 2 ? m = m.toString() : m = '0' + m.toString()
      d.toString().length == 2 ? d = d.toString() : d = '0' + d.toString()
      setMonth(m)
      setDay(d)
    },
    onCancel: () => {
      console.log('cancel')
      setShowDatePicker(false)
    }
  }
  const IconDisplayer = {
    Current: {
      USD: <Image style={styles.img} source={require('./src/image/nations/united-states.png')} />,
      HKD: <Image style={styles.img} source={require('./src/image/nations/hong-kong.png')} />,
      GBP: <Image style={styles.img} source={require('./src/image/nations/united-kingdom.png')} />,
      AUD: <Image style={styles.img} source={require('./src/image/nations/australia.png')} />,
      CAD: <Image style={styles.img} source={require('./src/image/nations/canada.png')} />,
      SGD: <Image style={styles.img} source={require('./src/image/nations/singapore.png')} />,
      CHF: <Image style={styles.img} source={require('./src/image/nations/switzerland.png')} />,
      JPY: <Image style={styles.img} source={require('./src/image/nations/japan.png')} />,
      ZAR: <Image style={styles.img} source={require('./src/image/nations/south-africa.png')} />,
      SEK: <Image style={styles.img} source={require('./src/image/nations/sweden.png')} />,
      NZD: <Image style={styles.img} source={require('./src/image/nations/new-zealand.png')} />,
      THB: <Image style={styles.img} source={require('./src/image/nations/thailand.png')} />,
      EUR: <Image style={styles.img} source={require('./src/image/nations/european-union.png')} />,
      CNY: <Image style={styles.img} source={require('./src/image/nations/china.png')} />,
      Error: <View style={[styles.img, { justifyContent: 'center', alignItems: 'center' }]}><Text>X</Text></View>
    },
    display: () => {
      if (currency === 'USD') { return (IconDisplayer.Current.USD) }
      else if (currency === 'HKD') { return (IconDisplayer.Current.HKD) }
      else if (currency === 'GBP') { return (IconDisplayer.Current.GBP) }
      else if (currency === 'AUD') { return (IconDisplayer.Current.AUD) }
      else if (currency === 'CAD') { return (IconDisplayer.Current.CAD) }
      else if (currency === 'SGD') { return (IconDisplayer.Current.SGD) }
      else if (currency === 'CHF') { return (IconDisplayer.Current.CHF) }
      else if (currency === 'JPY') { return (IconDisplayer.Current.JPY) }
      else if (currency === 'ZAR') { return (IconDisplayer.Current.ZAR) }
      else if (currency === 'SEK') { return (IconDisplayer.Current.SEK) }
      else if (currency === 'NZD') { return (IconDisplayer.Current.NZD) }
      else if (currency === 'THB') { return (IconDisplayer.Current.THB) }
      else if (currency === 'EUR') { return (IconDisplayer.Current.EUR) }
      else if (currency === 'CNY') { return (IconDisplayer.Current.CNY) }
      else { return (IconDisplayer.Current.Error) }
    }
  }
  const CurrencyRow = (props) => {
    const CurrencyBtn = (props) => {
      return (
        <TouchableOpacity
          style={styles.CurrencyBtn}
          onPress={() => { setCurrency(props.currency), setShowNationModal(false) }}
        >
          <Text style={styles.CurrencyBtn_t}>{props.currency}</Text>
        </TouchableOpacity>
      )
    }
    return (
      <View style={[styles.rowBox2, props.isLastRow ? { marginBottom: 0 } : {}]} //如果是最後一行，就不要加marginBottom
      >
        <CurrencyBtn currency={props.curr1} />
        <CurrencyBtn currency={props.curr2} />
      </View>
    )
  }
  const getResult = () => {
    let dateCode = '2019' + month + day
    reducedData.forEach((row) => {
      if (row[0] == dateCode & row[1] == currency) {
        setBuyIn(row[2])
        setSellOut(row[3].slice(0, -1))  //csv每行的最後一個資料的後面都會多一個字元，好像是\r，把它去掉
        console.log(row)
      } else { }
    })
  }
  useEffect(() => {
    fetchData()

  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {/* title */}
      <View style={styles.title_box}>
        <Text style={styles.title}>2019 年每日{'\n'} 各國匯率查詢</Text>
      </View>

      {/* info */}
      <View>

        <View style={styles.rowBox}>
          <Text style={styles.t}>日期： </Text>
          <Text style={styles.t}>{month}月{day}號  </Text>
          <TouchableHighlight
            style={styles.TH}
            underlayColor={'darkgray'}  // required
            onPress={() => { setShowDatePicker(true) }} //required
          >
            <Ionicon name={'calendar-sharp'} size={28} color={'#4E7BD0'} />
          </TouchableHighlight>
        </View>
        <View style={styles.rowBox}>
          <Text style={styles.t}>幣別： </Text>
          <Text style={styles.t}>{currency}  </Text>
          <TouchableHighlight
            style={styles.TH}
            underlayColor={'darkgray'}  // required
            onPress={() => { setShowNationModal(true) }} //required
          >
            {IconDisplayer.display()}
          </TouchableHighlight>
        </View>
      </View>

      <TouchableOpacity
        style={styles.TO}
        onPress={() => { getResult() }}
      >
        <Text style={styles.t}>
          Get
        </Text>
      </TouchableOpacity>

      <View style={[styles.rowBox, { width: '100%', justifyContent: 'space-evenly' }]}>
        <View style={styles.card}>
          <Text style={styles.card_t1}>買進價</Text>
          <View style={styles.card_rowBox}>
            <Text style={styles.card_t2}>{buyIn}</Text>
            <Text style={styles.card_t3}>元</Text>
          </View>
        </View>

        <View style={styles.card}>

          <Text style={styles.card_t1}>賣出價</Text>
          <View style={styles.card_rowBox}>
            <Text style={styles.card_t2}>{sellOut}</Text>
            <Text style={styles.card_t3}>元</Text>
          </View>
        </View>
      </View>

      {/* <Button title={'show'} onPress={() => {
        console.log('month:' + month, '\nday:' + day, '\nbuyIn:' + buyIn, '\nsellOut:' + sellOut)
        console.log('reducedData type:' + typeof reducedData)
        console.log('dateObj:' + dateObj)
      }} /> */}

      <Modal
        isVisible={showNationModal}
        useNativeDriver={true}
        onBackButtonPress={() => setShowNationModal(false)}
        onBackdropPress={() => setShowNationModal(false)}
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <View style={styles.nationModalView}>
          <CurrencyRow curr1={'USD'} curr2={'HKD'} />
          <CurrencyRow curr1={'GBP'} curr2={'AUD'} />
          <CurrencyRow curr1={'CAD'} curr2={'SGD'} />
          <CurrencyRow curr1={'CHF'} curr2={'JPY'} />
          <CurrencyRow curr1={'ZAR'} curr2={'SEK'} />
          <CurrencyRow curr1={'NZD'} curr2={'THB'} />
          <CurrencyRow curr1={'EUR'} curr2={'CNY'} isLastRow={true} />
        </View>
      </Modal>
      <DateTimePicker
        isVisible={showDatePicker}
        date={dateObj}
        minimumDate={new Date(2019, 0, 2)}
        maximumDate={new Date(2019, 11, 31)}
        mode="date"
        onConfirm={DateHandler.onChange}
        onCancel={DateHandler.onCancel}
      ></DateTimePicker>

    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },
  title_box: {
    // borderWidth: 1,
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  t: {
    fontSize: 20,
  },
  TH: {
    // borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TO: {
    // borderWidth: 1,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 16,
    backgroundColor: '#7E9FDD',
    elevation: 5
  },
  rowBox: {
    flexDirection: 'row',
    // borderWidth: 1,
    alignItems: 'center',
  },
  rowBox2: {
    flexDirection: 'row',
    // borderWidth: 1,
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  img: {
    width: 28,
    height: 28,
  },
  nationModalView: {
    width: '80%',
    minHeight: '60%',
    // borderWidth: 1,
    backgroundColor: '#F1F9DC',
    borderRadius: 20,
    padding: 20,
  },
  CurrencyBtn: {
    // borderWidth: 1,
    width: 80,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9BBFB3',
    elevation: 2,
  },
  CurrencyBtn_t: {
    fontSize: 16
  },
  card: {
    borderWidth: 1,
    width: 150,
    height: 150,
    borderRadius: 16,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#F0F3EE',
    borderColor: '#B5C4AB',
    elevation: 1
  },
  card_rowBox: {
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  card_t1: {
    fontSize: 20,
    fontWeight: '400'
  },
  card_t2: {
    // borderWidth: 1,
    fontSize: 40,
    fontWeight: '800'
  },
  card_t3: {
    // borderWidth: 1,
    fontSize: 12,
    fontWeight: 'bold',
    bottom: 5,
  }
})