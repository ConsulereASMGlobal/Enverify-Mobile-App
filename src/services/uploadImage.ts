import { Alert, Platform } from 'react-native';
import { axiosInstance } from '../helpers/axiosHelper';

export const uploadImage = async (image: any): Promise<boolean | string> => {
  if (!!!image?.uri) {
    return false;
  }
  const uri =
    Platform.OS === 'android' ? image.uri : image.uri.replace('file://', '');
  const filename = image.uri.split('/').pop();
  const match = /\.(\w+)$/.exec(filename as string);
  const ext = match?.[1];
  const type = match ? `image/${match[1]}` : `image`;
  const formData = new FormData();
  formData.append('file', {
    uri,
    name: `image.${ext}`,
    type
  } as any);

  try {
    const { data } = await axiosInstance
      .post(`upload/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(({ data }) => data);
    if (!!!data?.id) {
      Alert.alert('Upload failed');
    }

    return data?.id ?? false;
  } catch (err) {
    console.log(err);
    Alert.alert('Upload failed');
    return false;
  }
};
