import {Linking} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const options = {
  toolbarColor: '#6200EE',
  toolbarControlsColor: '#FFFFFF',
  showTitle: true,
  enableUrlBarHiding: true,
  enableDefaultShare: true,
  animations: {
    startEnter: 'slide_in_right',
    startExit: 'slide_out_left',
    endEnter: 'slide_in_left',
    endExit: 'slide_out_right',
  },
  headers: {
    'my-custom-header': 'my custom header value',
  },
};

const OpenLink = async (url: string) => {
  try {
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, options);
      console.log(result);
    } else {
      Linking.openURL(url);
    }
  } catch (error) {
    console.error(error);
  }
};

export default OpenLink;
