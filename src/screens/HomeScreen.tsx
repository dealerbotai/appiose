import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {products} from '../data/products';
import {RootStackParamList} from '../types';

const {width} = Dimensions.get('window');
const COLUMN_COUNT = 2;
const CARD_WIDTH = (width - 48) / COLUMN_COUNT;

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

function ProductCard({product}: {product: (typeof products)[0]}) {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('ProductDetail', {product})}>
      <Image source={{uri: product.image}} style={styles.productImage} />
      <View style={styles.cardContent}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.productSku}>{product.sku}</Text>
        <Text style={styles.productPrice}>${product.price} MXN</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brandName}>Eskin</Text>
        <Text style={styles.tagline}>Botas de alta calidad</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        numColumns={COLUMN_COUNT}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({item}) => <ProductCard product={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  brandName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#d4a574',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
    letterSpacing: 1,
  },
  list: {
    padding: 12,
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#111',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  productImage: {
    width: '100%',
    height: CARD_WIDTH,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    lineHeight: 18,
  },
  productSku: {
    fontSize: 11,
    color: '#555',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#d4a574',
    marginTop: 6,
  },
});
