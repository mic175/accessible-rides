import React, { useMemo } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Linking } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList, Provider } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Provider">;

export default function ProviderScreen({ route }: Props) {
  const p: Provider = route.params.provider;

  const smsBody = useMemo(() => {
    const msg = `Ride request: <date> <time>.
From <pickup> to <destination>.
Wheelchair: <manual/power>. Need <lift/tie-downs>.
Passenger+chair <X> lbs.
Please confirm availability & fare. Reply to this number. Thank you.`;
    return encodeURIComponent(msg);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <Text style={styles.name}>{p.name}</Text>
      {p.address ? <Text style={styles.line}>{p.address}</Text> : null}
      {p.open_hours ? <Text style={styles.line}>{p.open_now ? "Open now · " : ""}{p.open_hours}</Text> : null}
      <Text style={styles.line}>{(p.features ?? []).join(" · ")}</Text>
      {p.advance_notice ? <Text style={styles.line}>Advance notice: {p.advance_notice}</Text> : null}
      {p.notes ? <Text style={styles.line}>{p.notes}</Text> : null}

      <View style={styles.btnRow}>
        {p.phone ? (
          <Pressable style={styles.btn} onPress={() => Linking.openURL(`tel:${p.phone}`)}
            accessibilityRole="button" accessibilityLabel={`Call ${p.name}`}>
            <Text style={styles.btnText}>Call</Text>
          </Pressable>
        ) : null}

        {p.phone ? (
          <Pressable style={styles.btn} onPress={() => Linking.openURL(`sms:${p.phone}?body=${smsBody}`)}
            accessibilityRole="button" accessibilityLabel={`Text ${p.name}`}>
            <Text style={styles.btnText}>Text</Text>
          </Pressable>
        ) : null}

        <Pressable style={styles.btn}
          onPress={() => Linking.openURL(p.address
            ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(p.address)}`
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name)}`)}
          accessibilityRole="button" accessibilityLabel="Open in Google Maps">
          <Text style={styles.btnText}>Open in Maps</Text>
        </Pressable>
      </View>

      {p.website ? (
        <Pressable style={styles.secondary} onPress={() => Linking.openURL(p.website)}>
          <Text style={styles.secondaryText}>Visit website</Text>
        </Pressable>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 16 },
  name: { fontSize: 20, fontWeight: "800", marginBottom: 8, color: "#111827" },
  line: { color: "#374151", marginBottom: 6 },
  btnRow: { flexDirection: "row", gap: 8, marginTop: 12, flexWrap: "wrap" },
  btn: { backgroundColor: "#111827", paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10 },
  btnText: { color: "white", fontWeight: "700" },
  secondary: { paddingVertical: 10 },
  secondaryText: { color: "#2563EB", fontWeight: "600" },
});
