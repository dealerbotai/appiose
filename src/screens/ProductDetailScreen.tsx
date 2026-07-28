import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import {CONFIG} from '../data/config';

const {width} = Dimensions.get('window');

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen() {
  const route = useRoute<ProductDetailRouteProp>();
  const {product} = route.params;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const selectedVariant = product.variants.find(v => v.size === selectedSize);
  const displayPrice = selectedVariant
    ? selectedVariant.price
    : product.price;

  const handleBuy = () => {
    if (!selectedSize) {
      Alert.alert('Selecciona talla', 'Por favor selecciona una talla primero.');
      return;
    }
    const message = `Hola, quiero comprar:\n${product.name} (${product.sku})\nTalla: ${selectedSize}\nPrecio: $${displayPrice} MXN`;
    const url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() =>
      Alert.alert('Error', 'No se pudo abrir WhatsApp'),
    );
  };

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Image source={{uri: product.image}} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.sku}>{product.sku}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${displayPrice} MXN</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Características</Text>
        {product.features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <Text style={styles.featureBullet}>•</Text>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Selecciona tu talla</Text>
        <View style={styles.sizeGrid}>
          {product.variants.map(variant => {
            const isSelected = selectedSize === variant.size;
            const isLarge = parseFloat(variant.size) >= 21;
            return (
              <TouchableOpacity
                key={variant.id}
                style={[
                  styles.sizeButton,
                  isSelected && styles.sizeButtonSelected,
                  isLarge && styles.sizeButtonLarge,
                ]}
                activeOpacity={0.6}
                onPress={() => setSelectedSize(variant.size)}>
                <Text
                  style={[
                    styles.sizeText,
                    isSelected && styles.sizeTextSelected,
                    isLarge && styles.sizeTextLarge,
                  ]}>
                  {variant.size}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.buyButton, !selectedSize && styles.buyButtonDisabled]}
          activeOpacity={0.8}
          onPress={handleBuy}>
          <Text style={styles.buyButtonText}>
            {selectedSize
              ? `Comprar - Talla ${selectedSize}`
              : 'Selecciona una talla'}
          </Text>
        </TouchableOpacity>

        <View style={{height: 40}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  image: {
    width,
    height: width,
    resizeMode: 'cover',
    backgroundColor: '#111',
  },
  content: {
    padding: 20,
  },
  sku: {
    fontSize: 12,
    color: '#666',
    letterSpacing: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginTop: 4,
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: '#d4a574',
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#1a1a1a',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    color: '#999',
    lineHeight: 22,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  featureBullet: {
    fontSize: 16,
    color: '#d4a574',
    marginRight: 8,
    lineHeight: 22,
  },
  featureText: {
    fontSize: 14,
    color: '#999',
    lineHeight: 22,
    flex: 1,
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sizeButton: {
    width: (width - 68) / 5,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  sizeButtonSelected: {
    backgroundColor: '#d4a574',
    borderColor: '#d4a574',
  },
  sizeButtonLarge: {
    borderColor: '#333',
    backgroundColor: '#151515',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ccc',
  },
  sizeTextSelected: {
    color: '#0a0a0a',
  },
  sizeTextLarge: {
    color: '#d4a574',
  },
  buyButton: {
    marginTop: 24,
    backgroundColor: '#d4a574',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buyButtonDisabled: {
    backgroundColor: '#222',
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a0a0a',
    letterSpacing: 0.5,
  },
});
