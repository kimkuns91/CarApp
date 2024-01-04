import React, {useState} from 'react';
import {
  Image as RNImage,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import OpenLink from '../../hooks/openLink';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EFF2F4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
  },
  textInput: {
    flex: 2,
    fontSize: 13,
    fontWeight: '400',
  },
  imageBackground: {
    marginTop: 10,
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  navigateView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1C5BFF',
    padding: 20,
    borderRadius: 20,
  },
  navigateButton: {
    flex: 1,
  },
  navigateButtonCenter: {
    flex: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.2)',
    borderLeftWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.2)',
    borderRightWidth: 1,
  },
  navigateButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  newsView: {
    flex: 1,
    marginTop: 10,
  },
  newsTitleWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
    padding: 20,
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  newsTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    marginRight: 10,
  },
  newsSubTitle: {
    color: '#7e7e7e',
    fontSize: 15,
    fontWeight: '400',
  },
  newsBody: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  newsBodyText: {
    marginLeft: 10,
    flex: 1,
  },
});
const newsData = [
  {
    id: 1,
    url: 'https://www.thedrive.co.kr/news/newsview.php?ncode=1065600748011204',
    image:
      'https://post-phinf.pstatic.net/MjAyMzExMjhfMTIx/MDAxNzAxMTU5NjMzNTMy.DCs61_AAoot7Ak1bWKZb8xbVrQSclpKnhzZaL2NxhrAg.2jJu8xPdZ3k5ufTgIGDljKDU3S7R-MGhkQergi_ZVNog.JPEG/1.jpg?type=w1200',
    title: '"마이바흐급 뒷좌석"초대형 TV 탑재한 中 전기차',
    company: '더드라이브',
  },
  {
    id: 2,
    url: 'https://www.thedrive.co.kr/news/newsview.php?ncode=1065600748011204',
    image:
      'https://post-phinf.pstatic.net/MjAyMzExMjhfMTIx/MDAxNzAxMTU5NjMzNTMy.DCs61_AAoot7Ak1bWKZb8xbVrQSclpKnhzZaL2NxhrAg.2jJu8xPdZ3k5ufTgIGDljKDU3S7R-MGhkQergi_ZVNog.JPEG/1.jpg?type=w1200',
    title: '"마이바흐급 뒷좌석"초대형 TV 탑재한 中 전기차',
    company: '더드라이브',
  },
  {
    id: 3,
    url: 'https://www.thedrive.co.kr/news/newsview.php?ncode=1065600748011204',
    image:
      'https://post-phinf.pstatic.net/MjAyMzExMjhfMTIx/MDAxNzAxMTU5NjMzNTMy.DCs61_AAoot7Ak1bWKZb8xbVrQSclpKnhzZaL2NxhrAg.2jJu8xPdZ3k5ufTgIGDljKDU3S7R-MGhkQergi_ZVNog.JPEG/1.jpg?type=w1200',
    title: '"마이바흐급 뒷좌석"초대형 TV 탑재한 中 전기차',
    company: '더드라이브',
  },
  {
    id: 4,
    url: 'https://www.thedrive.co.kr/news/newsview.php?ncode=1065600748011204',
    image:
      'https://post-phinf.pstatic.net/MjAyMzExMjhfMTIx/MDAxNzAxMTU5NjMzNTMy.DCs61_AAoot7Ak1bWKZb8xbVrQSclpKnhzZaL2NxhrAg.2jJu8xPdZ3k5ufTgIGDljKDU3S7R-MGhkQergi_ZVNog.JPEG/1.jpg?type=w1200',
    title: '"마이바흐급 뒷좌석"초대형 TV 탑재한 中 전기차',
    company: '더드라이브',
  },
];
const HomeScreen = () => {
  const [carNumber, setCarNumber] = useState('');

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>차량번호</Text>
          <TextInput
            style={styles.textInput}
            autoCorrect={false}
            autoCapitalize={'none'}
            value={carNumber}
            onChangeText={setCarNumber}
            placeholder={'차량번호 입력하고 내 차 조회하기'}
          />
        </View>
        <View style={styles.navigateView}>
          <TouchableOpacity style={styles.navigateButton}>
            <Text style={styles.navigateButtonText}>필터교체</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigateButtonCenter}>
            <Text style={styles.navigateButtonText}>타이어 점검</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigateButton}>
            <Text style={styles.navigateButtonText}>오일교체</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.newsView}>
          <View style={styles.newsTitleWrap}>
            <Text style={styles.newsTitle}>NEWS</Text>
            <Text style={styles.newsSubTitle}>
              시승기 자동차 관련 뉴스 모아보기
            </Text>
          </View>
          {newsData &&
            newsData.map(data => (
              <TouchableOpacity
                key={data.id}
                style={styles.newsBody}
                onPress={() => {
                  OpenLink(data.url);
                }}>
                <RNImage
                  source={{uri: data.image}}
                  style={{borderRadius: 5, width: 100, height: 70}}
                />
                <Text style={styles.newsBodyText}>{data.title}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
