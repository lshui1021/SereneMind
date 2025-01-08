import React from "react";
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { colors } from "../utils/color";
import { useNavigation } from "@react-navigation/native";

const PolicyScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <MaterialIcons name={"keyboard-arrow-left"} color={colors.white} size={40} />
      </TouchableOpacity>
      <Text style={styles.header}>SereneMind心理健康應用程式</Text>
      <Text style={styles.subHeader}>個人資料使用同意書</Text>
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.content}>
          感謝您使用我們的服務！在使用我們的應用程式之前，請仔細閱讀以下條款，這些條款說明了我們如何蒐集、使用及保護您的個人資料。
        </Text>
        <View style={styles.divider} />
        <Text style={styles.sectionHeader}>一、蒐集的個人資料</Text>
        <Text style={styles.content}>
          我們將基於提供服務的需要，蒐集以下個人資料：
        </Text>
        <Text style={styles.list}>
          1. 基本資訊：例如您的姓名、電子郵件地址。{"\n"}
          2. 使用行為數據：例如應用程式使用情況、偏好設置。{"\n"}
          3. 裝置資訊：例如裝置型號、操作系統版本。{"\n"}
          4. 其他必要資訊：您在使用應用時提供的任何其他資料。
        </Text>
        <View style={styles.divider} />
        <Text style={styles.sectionHeader}>二、個人資料的使用目的</Text>
        <Text style={styles.list}>
          1. 提供服務：為您提供我們的應用程式功能，包括帳號註冊、登入及日記管理等功能。{"\n"}
          2. 改善服務：分析應用使用行為，優化用戶體驗。{"\n"}
          3. 行銷推廣（若適用）：基於您的同意，我們可能發送相關的活動或優惠訊息。{"\n"}
          4. 法律合規：配合政府機關的合法要求或其他法律義務。
        </Text>
        <View style={styles.divider} />
        <Text style={styles.sectionHeader}>三、個人資料的保護與保存</Text>
        <Text style={styles.list}>
          1. 保護措施：我們採取加密、權限控管等技術措施來保護您的個人資料安全。{"\n"}
          2. 保存期限：您的資料將在服務期間保存，若您註銷帳戶或要求刪除，我們將在合理時間內進行刪除，除非法律另有規定。
        </Text>
        <View style={styles.divider} />
        <Text style={styles.sectionHeader}>四、個人資料的分享</Text>
        <Text style={styles.list}>
          1. 我們不會與第三方分享您的個人資料，除非獲得您的明確同意或法律要求。{"\n"}
          2. 為執行應用功能或服務，我們可能與合作夥伴（如數據分析工具）共享必要資訊，但僅限於履行目的所需的範圍。
        </Text>
        <View style={styles.divider} />
        <Text style={styles.sectionHeader}>五、您的權利</Text>
        <Text style={styles.list}>
          1. 查詢與請求副本：查詢我們蒐集的您的個人資料。{"\n"}
          2. 請求更正或刪除：如資料有誤，您可要求更正或刪除。{"\n"}
          3. 撤回同意：您隨時可撤回對個人資料使用的同意，但可能影響部分功能的使用。{"\n"}
          4. 限制處理：在特定情況下，您可要求限制資料處理。
        </Text>
        <View style={styles.divider} />
        <Text style={styles.sectionHeader}>六、聯絡方式</Text>
        <Text style={styles.content}>
          如有任何問題或需要進一步協助，請通過以下方式聯絡我們：{"\n"}
          • 電子郵件：s1111718@gmai.com{"\n"}
          • 客服電話：+886-1234-5678{"\n"}
          • 郵寄地址：320桃園市中壢區遠東路135號
        </Text>
        <View style={styles.divider} />
        <Text style={styles.sectionHeader}>七、修改條款</Text>
        <Text style={styles.content}>
          我們可能不時更新本同意書內容，並將變更公告於應用程式內。若您在更新後繼續使用本應用，視為您同意新的條款。
        </Text>
        <Text style={styles.footer}>
          我已閱讀並同意上述條款與條件。
        </Text>
      </ScrollView>
    </View>
  );
};

export default PolicyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightpink,
    padding: 20,
  },
  backButtonWrapper: {
    height: 50,
    width: 50,
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 18,
    color: colors.secondary,
    textAlign: "center",
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  content: {
    fontSize: 14,
    color: colors.primary,
    lineHeight: 20,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
    marginTop: 15,
    marginBottom: 10,
  },
  list: {
    fontSize: 14,
    color: colors.primary,
    lineHeight: 20,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray,
    marginVertical: 15,
  },
  footer: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});
