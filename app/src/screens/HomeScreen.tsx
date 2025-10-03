import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet, SafeAreaView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList, Provider } from "../../App";
import { Linking } from "react-native";


// load local JSON (bundled at build time)
const providers: Provider[] = require("../../assets/providers.json");

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const openMapsSearch = () => {
    const url =
      "https://www.google.com/maps/search/?api=1&query=wheelchair%20accessible%20transportation%20near%20me";
    Linking.openURL(url);
  };

  const renderItem = ({ item }: { item: Provider }) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${item.name} details`}
      onPress={() => navigation.navigate("Provider", { provider: item })}
      style={styles.card}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.meta}>
        {item.open_now ? "Open now • " : ""}
        {item.open_hours ?? ""}
      </Text>
      <Text style={styles.badges}>
        {(item.features ?? []).map((f) => tagLabel(f)).join(" · ")}
        {item.advance_notice ? ` · Notice: ${item.advance_notice}` : ""}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.primaryBtn} onPress={openMapsSearch}
        accessibilityRole="button" accessibilityLabel="Use my location in Google Maps">
        <Text style={styles.primaryBtnText}>Use my location (Maps)</Text>
      </Pressable>

      <FlatList
        data={providers}
        keyExtractor={(p) => p.name}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 12 }}
      />
    </SafeAreaView>
  );
}

function tagLabel(key: string) {
  switch (key) {
    case "van_lift": return "Lift";
    case "tie_downs": return "Tie-downs";
    case "seat_belts": return "Belts";
    default: return key;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  primaryBtn: { margin: 12, padding: 14, backgroundColor: "#111827", borderRadius: 12 },
  primaryBtnText: { color: "white", textAlign: "center", fontSize: 16, fontWeight: "600" },
  card: { backgroundColor: "#F3F4F6", padding: 14, borderRadius: 12, marginBottom: 10 },
  name: { fontSize: 16, fontWeight: "700", color: "#111827", marginBottom: 4 },
  meta: { color: "#374151", marginBottom: 2 },
  badges: { color: "#6B7280" },
});
