import { NextResponse } from "next/server";
import { renderToBuffer, Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1D1D1F",
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 52,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  logo: { fontSize: 16, fontFamily: "Helvetica-Bold", color: "#0071E3" },
  logoSub: { fontSize: 9, color: "#9CA3AF", marginTop: 3 },
  headerRight: { alignItems: "flex-end" },
  refText: { fontSize: 8, color: "#9CA3AF" },
  dateText: { fontSize: 8, color: "#6E6E73", marginTop: 2 },
  badge: {
    backgroundColor: "#DBEAFE",
    color: "#0071E3",
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    marginTop: 6,
  },
  section: { marginBottom: 22 },
  sectionTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#0071E3",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  infoGrid: { flexDirection: "row", gap: 16 },
  infoBox: {
    flex: 1,
    backgroundColor: "#F9FAFF",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  infoLabel: { fontSize: 8, color: "#9CA3AF", marginBottom: 3 },
  infoValue: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#1D1D1F" },
  bodyText: { fontSize: 10, color: "#374151", lineHeight: 1.6 },
  analysisBox: {
    backgroundColor: "#F9FAFF",
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: "#0071E3",
    marginBottom: 10,
  },
  analysisTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#1D1D1F", marginBottom: 6 },
  recommendationRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 8, gap: 8 },
  bullet: {
    width: 14,
    height: 14,
    backgroundColor: "#DCFCE7",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  bulletText: { fontSize: 8, color: "#16A34A", fontFamily: "Helvetica-Bold" },
  recommendationText: { flex: 1, fontSize: 10, color: "#374151", lineHeight: 1.5 },
  conclusionBox: {
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    marginBottom: 24,
  },
  conclusionTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#0071E3", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 },
  conclusionText: { fontSize: 10, color: "#1E40AF", lineHeight: 1.6 },
  signatureBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  sigLeft: {},
  sigName: { fontSize: 11, fontFamily: "Helvetica-Bold", color: "#1D1D1F" },
  sigTitle: { fontSize: 9, color: "#6E6E73", marginTop: 2 },
  sigNum: { fontSize: 8, color: "#9CA3AF", marginTop: 1 },
  sigRight: { alignItems: "flex-end" },
  sigDate: { fontSize: 9, color: "#6E6E73" },
  sigConfidential: {
    fontSize: 7,
    color: "#9CA3AF",
    backgroundColor: "#F5F5F7",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginTop: 4,
  },
  disclaimer: {
    fontSize: 7.5,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 1.5,
  },
});

function ReportPDF() {
  return React.createElement(
    Document,
    { title: "Exemple de Second Avis Médical — TrustMyDiag" },
    React.createElement(
      Page,
      { size: "A4", style: styles.page },

      // Header
      React.createElement(
        View,
        { style: styles.header },
        React.createElement(
          View,
          null,
          React.createElement(Text, { style: styles.logo }, "TrustMyDiag"),
          React.createElement(Text, { style: styles.logoSub }, "Second avis médical indépendant")
        ),
        React.createElement(
          View,
          { style: styles.headerRight },
          React.createElement(Text, { style: styles.refText }, "Réf. #TMD-2025-0042-EXEMPLE"),
          React.createElement(Text, { style: styles.dateText }, "Date : 14 avril 2025"),
          React.createElement(Text, { style: styles.badge }, "DOCUMENT EXEMPLE — ANONYMISÉ")
        )
      ),

      // Infos patient
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Informations du dossier"),
        React.createElement(
          View,
          { style: styles.infoGrid },
          React.createElement(
            View,
            { style: styles.infoBox },
            React.createElement(Text, { style: styles.infoLabel }, "Spécialité"),
            React.createElement(Text, { style: styles.infoValue }, "Chirurgie dentaire")
          ),
          React.createElement(
            View,
            { style: styles.infoBox },
            React.createElement(Text, { style: styles.infoLabel }, "Type de document analysé"),
            React.createElement(Text, { style: styles.infoValue }, "Devis & compte rendu radiologique")
          ),
          React.createElement(
            View,
            { style: styles.infoBox },
            React.createElement(Text, { style: styles.infoLabel }, "Délai de réponse"),
            React.createElement(Text, { style: styles.infoValue }, "38 heures")
          )
        )
      ),

      // Contexte
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Contexte transmis par le patient"),
        React.createElement(
          Text,
          { style: styles.bodyText },
          "Le patient (M. — anonymisé) consulte suite à un devis dentaire élevé reçu de son praticien habituel. " +
          "Le devis comprend la pose de 3 implants (dents 36, 46 et 47) ainsi que 2 couronnes céramo-métalliques (dents 15 et 25), " +
          "pour un montant total de 4 850 €. Le patient souhaite un second regard indépendant avant d'accepter ce plan de traitement."
        )
      ),

      // Analyse
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Analyse du compte rendu"),
        React.createElement(
          View,
          { style: styles.analysisBox },
          React.createElement(Text, { style: styles.analysisTitle }, "Implant dent 36 — Justifié"),
          React.createElement(
            Text,
            { style: styles.bodyText },
            "La radiographie panoramique confirme une perte osseuse avancée en zone 36. L'extraction et la pose d'un implant " +
            "apparaissent médicalement justifiées. Le tarif unitaire de 1 200 € est cohérent avec les pratiques du secteur."
          )
        ),
        React.createElement(
          View,
          { style: styles.analysisBox },
          React.createElement(Text, { style: styles.analysisTitle }, "Implants dents 46 et 47 — À reconsidérer"),
          React.createElement(
            Text,
            { style: styles.bodyText },
            "L'examen radiographique ne montre pas de perte osseuse significative en zone 46. Une obturation (soin conservateur) " +
            "serait suffisante à ce stade. Concernant la dent 47, la situation est à surveiller mais ne nécessite pas d'intervention immédiate. " +
            "Ces deux postes représentent 2 400 € potentiellement évitables."
          )
        ),
        React.createElement(
          View,
          { style: styles.analysisBox },
          React.createElement(Text, { style: styles.analysisTitle }, "Couronnes dents 15 et 25 — Partiellement justifié"),
          React.createElement(
            Text,
            { style: styles.bodyText },
            "La couronne en 15 est justifiée au regard de la carie profonde visible sur le cliché rétroalvéolaire. " +
            "En revanche, la dent 25 présente une carie de classe II qui peut être traitée par un simple composite (environ 80 €) " +
            "sans nécessiter de couronne (580 €)."
          )
        )
      ),

      // Recommandations
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "Recommandations"),
        React.createElement(
          View,
          { style: styles.recommendationRow },
          React.createElement(View, { style: styles.bullet }, React.createElement(Text, { style: styles.bulletText }, "✓")),
          React.createElement(Text, { style: styles.recommendationText }, "Accepter uniquement l'implant en zone 36 et la couronne en zone 15 dans l'immédiat.")
        ),
        React.createElement(
          View,
          { style: styles.recommendationRow },
          React.createElement(View, { style: styles.bullet }, React.createElement(Text, { style: styles.bulletText }, "✓")),
          React.createElement(Text, { style: styles.recommendationText }, "Demander un soin conservateur (obturation) pour la dent 46 auprès d'un autre praticien.")
        ),
        React.createElement(
          View,
          { style: styles.recommendationRow },
          React.createElement(View, { style: styles.bullet }, React.createElement(Text, { style: styles.bulletText }, "✓")),
          React.createElement(Text, { style: styles.recommendationText }, "Remplacer la couronne en 25 par un composite — traitement moins invasif et plus économique.")
        ),
        React.createElement(
          View,
          { style: styles.recommendationRow },
          React.createElement(View, { style: styles.bullet }, React.createElement(Text, { style: styles.bulletText }, "✓")),
          React.createElement(Text, { style: styles.recommendationText }, "Reporter la décision concernant la dent 47 à un bilan de contrôle dans 6 mois.")
        )
      ),

      // Conclusion
      React.createElement(
        View,
        { style: styles.conclusionBox },
        React.createElement(Text, { style: styles.conclusionTitle }, "Conclusion du spécialiste"),
        React.createElement(
          Text,
          { style: styles.conclusionText },
          "Sur les 4 850 € devisés initialement, seuls 1 780 € de soins apparaissent médicalement justifiés et urgents. " +
          "Les postes relatifs aux dents 46, 47 et 25 peuvent être reconsidérés, soit une économie potentielle de 2 900 € " +
          "sans compromettre votre santé bucco-dentaire. Je recommande de solliciter un devis alternatif auprès d'un second praticien " +
          "pour les actes conservateurs avant toute décision chirurgicale."
        )
      ),

      // Signature
      React.createElement(
        View,
        { style: styles.signatureBox },
        React.createElement(
          View,
          { style: styles.sigLeft },
          React.createElement(Text, { style: styles.sigName }, "Dr. R. Benguigui"),
          React.createElement(Text, { style: styles.sigTitle }, "Chirurgien-dentiste — Expert TrustMyDiag"),
          React.createElement(Text, { style: styles.sigNum }, "N° RPPS : 10XXXXXXXXX")
        ),
        React.createElement(
          View,
          { style: styles.sigRight },
          React.createElement(Text, { style: styles.sigDate }, "Rendu le 14 avril 2025"),
          React.createElement(Text, { style: styles.sigConfidential }, "Document confidentiel — Usage patient uniquement")
        )
      ),

      // Disclaimer
      React.createElement(
        Text,
        { style: styles.disclaimer },
        "Ce document est un exemple anonymisé à titre illustratif. TrustMyDiag — Second avis médical indépendant — trustmydiag.com\n" +
        "Conforme RGPD · Données chiffrées · Médecins diplômés en exercice"
      )
    )
  );
}

export async function GET() {
  const buffer = await renderToBuffer(React.createElement(ReportPDF));
  return new NextResponse(buffer as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="exemple-rapport-trustmydiag.pdf"',
    },
  });
}
