import { useState } from "react";
import { Image } from "react-native";
import { calculateHeight } from "~/lib/useImageResponsive";

const ResponsiveImageScreen = ({...props}) => {
  const [source, setSource] = useState(props.source);

  return ( 
    <Image {...props} 
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        console.log({
            targetWidth: width,
            width: props.source.width,
            height: props.source.height,
          });
        setSource({
          uri: props.source.uri,
          width: width,
          height: calculateHeight({
            targetWidth: width,
            width: props.source.width,
            height: props.source.height,
          }) 
        });
      }}
      source={source}
    />
   );
}
 
export default ResponsiveImageScreen;