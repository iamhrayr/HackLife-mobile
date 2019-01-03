// @flow

import variable from "./../variables/platform";

export default (variables /*: * */ = variable) => {
  const contentTheme = {
    flex: 1,
    backgroundColor: "transparent",
    paddingEnd: 12,
    paddingStart: 12,
    "NativeBase.Segment": {
      borderWidth: 0,
      backgroundColor: "transparent"
    }
  };

  return contentTheme;
};
