import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

// Stack dentro de la pestaña "Inicio"
export type HomeStackParamList = {
  HomeMain: undefined;
  Details: undefined;
};

// Tabs principales
export type RootTabParamList = {
  Inicio: undefined;
  Cámara: undefined;
  Portapapeles: undefined;
  Sensor: undefined;
};

// Props tipadas por pantalla
export type HomeScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'HomeMain'>,
  BottomTabScreenProps<RootTabParamList>
>;

export type DetailsScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'Details'
>;
