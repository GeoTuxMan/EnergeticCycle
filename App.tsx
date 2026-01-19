import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';

// Descriptions from requirements
const YEAR_DESCRIPTIONS: Record<number, { title: string, text: string }> = {
  1: {
    title: "Anul 1 (Început)",
    text: "Anul 1 reprezintă un nou început, este început de ciclu. Îți aduce multe schimbări calitative și esențiale și vei simți că intri într-o nouă viață.\nEste un an favorabil să începi o nouă activitate, poți schimba profesia sau domeniul de activitate, poți începe să studiezi ceva nou.\nAnul începuturilor și este recomandat să le faci în acest an, vei simți mult sprijin și protecție timp de 9 ani."
  },
  2: {
    title: "Anul 2 (Emoții)",
    text: "Dacă te afli în anul 2 întreabă-te permanent “Ce simți?“. Este un an al emoțiilor, un an de dezvoltare, parteneriate și cooperare.\nÎnsă e necesar să fii foarte precaut în alegerea legăturilor de colaborare, prietenie, deoarece în acest an problemele pot apărea de la oameni (mai ales sexul opus)."
  },
  3: {
    title: "Anul 3 (Creativitate)",
    text: "Anul 3 te întreabă “Ce faci concret?“. Este necesară multă creativitate și expansiune socială.\nEste o etapă potrivită pentru autoexprimare și activități în plan social. Ideal să începi un proces de autocunoaștere, să înțelegi cine ești tu, să acumulezi noi informații.\nTe poți ocupa de mai multe proiecte, activități, poți diversifica ceea ce faci."
  },
  4: {
    title: "Anul 4 (Muncă)",
    text: "În anul 4 este vorba despre muncă. Întrebarea este “Ce poți obține temeinic?”. Este un an în care vei munci din greu, cu multă responsabilitate și temeinicie.\nNu uita de autocontrol. Apare un conflict interior între corp și spirit.\nGăsește echilibrul în viața de zi cu zi. Succesul vine către tine, dacă muncești din greu și responsabil."
  },
  5: {
    title: "Anul 5 (Schimbare)",
    text: "Un an cu situații neașteptate, favorabil pentru dragoste și iubire, pentru a acumula noi prieteni și cunoscuți. Întrebarea este “Cu cine te însoțești?“.\nUn an pentru călătorii și activități non-conformiste. Apar deopotrivă și peripeții și distracții. Folosește-ți intuiția și atenție la gradul de risc."
  },
  6: {
    title: "Anul 6 (Responsabilitate)",
    text: "Iubire. Familie. Cămin și Responsabilitate. An favorabil pentru a trece la un nou loc de trăi.\nCe partener ai? Anul întemeierii sau destrămării unui cuplu și/sau a familiei. Cele mai multe divorțuri apar în anul acesta."
  },
  7: {
    title: "Anul 7 (Analiză)",
    text: "Ce observi? Este timpul pentru a analiza și a înțelege, este anul gândirii intensive, al revizuirii tuturor evenimentelor.\nEste anul care aduce cu sine roadele eforturilor și stăruințelor din trecut."
  },
  8: {
    title: "Anul 8 (Realizări)",
    text: "Realizări materiale și acumulări de capital.\nLumea socială. Ce ai material? Cine e lumea ta? A venit vremea să strângeți roadele muncii de până acum și să vă plătiți datoriile.\nAcest an aduce din plin posibilitatea simțirii responsabilităților."
  },
  9: {
    title: "Anul 9 (Bilanț)",
    text: "Reflecție, bilanț, renunțare la vechi și transformare. Ce atașamente și convingeri ai? În ce te transformi?\nAnul 9 este un an de finalizare, de bilanț, de acumulare de cunoștințe pentru un nou ciclu.\nAn de examene pregătitoare pentru o nouă fază a vieții, de o nouă versiune a ta, mult diferită și evoluată."
  }
};

export default function App() {
  const [date, setDate] = useState(new Date(1987, 5, 21)); // Default example
  const [showPicker, setShowPicker] = useState(false);
  const [table, setTable] = useState<number[][]>([]);
  const [selectedYearInfo, setSelectedYearInfo] = useState<{ year: number, cycleYear: number } | null>(null);

  const generateTable = () => {
    const birthYear = date.getFullYear();
    // Generate 9 columns.
    // How many rows? Let's assume till age 90 or 9 rows (81 years).
    const rows = [];
    const MAX_AGE = 81;

    let currentYear = birthYear;
    for (let i = 0; i < MAX_AGE; i += 9) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(currentYear + i + j);
      }
      rows.push(row);
    }
    setTable(rows);
  };

  const handleYearPress = (year: number, colIndex: number) => {
    // colIndex 0 = Year 1, colIndex 8 = Year 9
    const cycleYear = colIndex + 1;
    setSelectedYearInfo({ year, cycleYear });
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Energetic Cycles</Text>

      {/* Inputs */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Select Birth Date:</Text>
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.datePickerBtn}>
          <Text style={styles.dateText}>
            {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={generateTable} style={styles.generateBtn}>
          <Text style={styles.generateBtnText}>GENERATE TABLE</Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {/* Table */}
      <ScrollView style={styles.tableContainer}>
        {table.length > 0 && (
          <View>
            {/* Header */}
            <View style={styles.headerRow}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(y => (
                <TouchableOpacity key={y} onPress={() => setSelectedYearInfo({ year: 0, cycleYear: y })}>
                  <Text style={styles.headerText}>Y{y}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Rows */}
            {table.map((row, rIdx) => (
              <View key={rIdx} style={styles.row}>
                {row.map((year, cIdx) => (
                  <TouchableOpacity
                    key={cIdx}
                    onPress={() => handleYearPress(year, cIdx)}
                    style={styles.cell}
                  >
                    <Text style={styles.cellText}>{year}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
            <View style={{ height: 80 }} />
          </View>
        )}
      </ScrollView>

      {/* Info Modal */}
      <Modal
        visible={!!selectedYearInfo}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedYearInfo(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedYearInfo && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {selectedYearInfo.year > 0 ? selectedYearInfo.year : `Cycle ${selectedYearInfo.cycleYear}`}
                  </Text>
                  <View style={styles.cycleBadge}>
                    <Text style={styles.cycleBadgeText}>
                      Cycle Year {selectedYearInfo.cycleYear}
                    </Text>
                  </View>
                </View>

                <ScrollView>
                  <Text style={styles.descriptionTitle}>
                    {YEAR_DESCRIPTIONS[selectedYearInfo.cycleYear].title}
                  </Text>
                  <Text style={styles.descriptionText}>
                    {YEAR_DESCRIPTIONS[selectedYearInfo.cycleYear].text}
                  </Text>
                </ScrollView>

                <TouchableOpacity
                  onPress={() => setSelectedYearInfo(null)}
                  style={styles.closeBtn}
                >
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e1065', // violet-950
    paddingTop: 64, // pt-16
    paddingHorizontal: 16, // px-4
  },
  title: {
    fontSize: 30, // 3xl
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24, // 6
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#4c1d95', // violet-900
    padding: 16, // 4
    borderRadius: 12, // xl
    marginBottom: 24, // 6
  },
  inputLabel: {
    color: 'white',
    marginBottom: 8, // 2
  },
  datePickerBtn: {
    backgroundColor: 'white',
    padding: 12, // 3
    borderRadius: 8, // lg
  },
  dateText: {
    fontSize: 18, // lg
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4c1d95', // violet-900
  },
  generateBtn: {
    backgroundColor: '#ec4899', // pink-500
    marginTop: 16, // 4
    padding: 12, // 3
    borderRadius: 8, // lg
  },
  generateBtnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 24, // rounded-t-3xl
    borderTopRightRadius: 24, // rounded-t-3xl
    padding: 16, // 4
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8, // 2
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db', // gray-300
    paddingBottom: 8, // 2
  },
  headerText: {
    fontSize: 12, // xs
    fontWeight: 'bold',
    width: 32, // w-8
    textAlign: 'center',
    color: '#6b7280', // gray-500
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8, // 2
  },
  cell: {
    width: 32, // w-8
    alignItems: 'center',
  },
  cellText: {
    fontSize: 12, // xs
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // black/50
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16, // 4
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16, // 2xl
    padding: 24, // 6
    width: '100%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16, // 4
  },
  modalTitle: {
    fontSize: 24, // 2xl
    fontWeight: 'bold',
    color: '#4c1d95', // violet-900
  },
  cycleBadge: {
    backgroundColor: '#fce7f3', // pink-100
    paddingHorizontal: 12, // 3
    paddingVertical: 4, // 1
    borderRadius: 9999, // full
  },
  cycleBadgeText: {
    color: '#db2777', // pink-600
    fontWeight: 'bold',
  },
  descriptionTitle: {
    fontSize: 20, // xl
    fontWeight: 'bold',
    marginBottom: 8, // 2
    color: '#1f2937', // gray-800
  },
  descriptionText: {
    fontSize: 18, // lg
    color: '#4b5563', // gray-600
    lineHeight: 24, // leading-6
  },
  closeBtn: {
    backgroundColor: '#4c1d95', // violet-900
    padding: 16, // 4
    borderRadius: 12, // xl
    marginTop: 24, // 6
  },
  closeBtnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
