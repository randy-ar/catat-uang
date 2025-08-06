import { FirebaseAuthTypes, getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { Separator } from "@rn-primitives/select";
import { ArrowRight, Bug, ChevronRight, Github, Handshake, HelpCircle, Info, Languages, Lock, LogOut, Mail, MailCheck, MoonStar, Phone, Sun, User, UserCheck2 } from "lucide-react-native";
import { JSX, use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Linking, Pressable, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { useSession } from "~/lib/context";
import { iconWithClassName } from "~/lib/icons/iconWithClassName";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";
import { Switch } from "~/components/ui/switch";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetModal
} from '@gorhom/bottom-sheet';
import { Small } from "~/components/ui/typography";
var pkg = require('~/package.json');
iconWithClassName(Info)
iconWithClassName(ChevronRight)
iconWithClassName(MoonStar)
iconWithClassName(Sun)
iconWithClassName(User)
iconWithClassName(UserCheck2)
iconWithClassName(HelpCircle)
iconWithClassName(Handshake)
iconWithClassName(Lock)
iconWithClassName(Bug)
iconWithClassName(Languages)
iconWithClassName(Github)
iconWithClassName(Mail)
iconWithClassName(LogOut)

const renderHelpContent = (lang: string | null, isDarkColorScheme: boolean = false) => {
  if (lang === 'id') {
    return (
      <View className="flex-1 p-4">
        <Text className="text-xl font-bold mb-4 text-dark">Bantuan</Text>
        <Text className="text-base text-foreground mb-4 text-dark">
          Jika Anda memiliki pertanyaan, saran, atau butuh bantuan terkait aplikasi, Anda bisa menghubungi kami.
        </Text>
        
        <Button variant={isDarkColorScheme ? 'secondary' : 'default'} className="flex-row items-center mt-4" onPress={() => Linking.openURL('mailto:randy.10122416@mahasiswa.unikom.ac.id')}>
          <Mail className="text-white me-2"/>
          <Text>
            Contact Via Email
          </Text>
        </Button>
      </View>
    );
  }
  return (
    <View className="flex-1 p-4">
      <Text className="text-xl font-bold mb-4 text-dark">Help</Text>
      <Text className="text-base text-foreground mb-4 text-dark">
        If you have any questions, suggestions, or need assistance with the app, feel free to contact us.
      </Text>
      <Button variant={isDarkColorScheme ? 'secondary' : 'default'} className="flex-row items-center mt-4" onPress={() => Linking.openURL('mailto:randy.10122416@mahasiswa.unikom.ac.id')}>
        <Mail className="text-white me-2"/>
        <Text>
          Contact Via Email
        </Text>
      </Button>
    </View>
  );
};

const renderTermsOfServiceContent = (lang: string | null) => {
  if (lang === 'id') {
    return (
      <View className="flex-1 px-2 pb-32 text-dark">
        <Text className="text-xl font-bold mb-4">Ketentuan Layanan</Text>
        
        <Text className="text-lg font-bold text-dark mt-2 mb-2">1. Deskripsi Layanan</Text>
        <Text className="text-base text-dark mb-4 text-justify">
          Catat-Uang adalah aplikasi pencatatan keuangan pribadi yang memungkinkan Anda mengelola data pemasukan dan pengeluaran. Aplikasi ini memiliki fitur untuk memindai struk belanja melalui teknologi OCR (Optical Character Recognition) agar proses pencatatan menjadi lebih cepat.
        </Text>
        
        <Text className="text-lg font-bold text-dark mt-2 mb-2">2. Keterbatasan dan Batasan Tanggung Jawab</Text>
        <Text className="text-base text-dark mb-1 text-justify">
          Aplikasi ini disediakan "sebagaimana adanya" (as is) tanpa jaminan apa pun. Kami berusaha memberikan layanan terbaik, namun ada beberapa keterbatasan yang perlu Anda pahami:
        </Text>
        <View className="ml-4">
          <Text className="text-base text-dark text-justify">• <Text className="font-medium text-dark">Keterbatasan Server:</Text> Aplikasi ini berjalan pada server dengan sumber daya terbatas. Oleh karena itu, aplikasi mungkin mengalami penurunan performa, lambat, atau bahkan tidak dapat diakses sewaktu-waktu.</Text>
          <Text className="text-base text-dark text-justify">• <Text className="font-medium text-dark">Keterbatasan OCR:</Text> Fitur pemindaian struk menggunakan teknologi OCR dari Tesseract.js. Teknologi ini tidak menjamin keakuratan 100%. Anda bertanggung jawab untuk memeriksa dan mengedit data yang dihasilkan oleh fitur OCR.</Text>
          <Text className="text-base text-dark text-justify">• <Text className="font-medium text-dark">Keterbatasan API:</Text> Kami menggunakan API Gemini untuk memproses data. API ini memiliki batasan penggunaan harian karena kami menggunakan paket uji coba (trial student). Jika batasan tersebut tercapai, fitur pemrosesan data (termasuk OCR) mungkin tidak dapat berfungsi hingga batasan direset.</Text>
          <Text className="text-base text-dark text-justify">• <Text className="font-medium text-dark">Tidak Ada Jaminan Keuangan:</Text> Data yang Anda catat di aplikasi ini tidak bisa dianggap sebagai laporan keuangan resmi atau nasihat profesional. Kami tidak bertanggung jawab atas kerugian finansial atau kerugian lain yang mungkin timbul akibat penggunaan atau keterbatasan aplikasi ini.</Text>
        </View>

        <Text className="text-lg font-bold text-dark mt-4 mb-2">3. Hak dan Kewajiban Pengguna</Text>
        <View className="ml-4">
          <Text className="text-base text-dark mb-1 text-justify">• <Text className="font-medium text-dark">Hak Pengguna:</Text> Anda berhak menggunakan aplikasi sesuai fungsinya, yaitu untuk mencatat dan mengelola keuangan pribadi.</Text>
          <Text className="text-base text-dark mb-1 text-justify">• <Text className="font-medium text-dark">Kewajiban Pengguna:</Text> Anda bertanggung jawab penuh atas semua data yang Anda masukkan dan kelola dalam aplikasi. Pastikan data yang Anda masukkan adalah akurat. Anda juga bertanggung jawab untuk menjaga keamanan akun Anda.</Text>
          <Text className="text-base text-dark text-justify">• <Text className="font-medium text-dark">Larangan:</Text> Anda dilarang menggunakan aplikasi untuk tujuan ilegal, melanggar hak cipta, atau mengunggah konten yang berbahaya. Anda juga tidak diperbolehkan mencoba mengakses atau mengganggu sistem aplikasi secara ilegal.</Text>
        </View>
        
        <Text className="text-lg font-bold text-dark mt-4 mb-2">4. Kepemilikan Data</Text>
        <Text className="text-base text-dark mb-4">
          Data keuangan pribadi yang Anda masukkan ke dalam aplikasi adalah milik Anda sepenuhnya. Kami mungkin menggunakan data penggunaan aplikasi (tanpa identitas pribadi) untuk analisis internal dan pengembangan fitur.
        </Text>
        
        <Text className="text-lg font-bold text-dark mt-4 mb-2">5. Perubahan Ketentuan</Text>
        <Text className="text-base text-dark mb-4">
          Kami berhak untuk mengubah ketentuan layanan ini kapan saja. Kami akan memberitahukan Anda mengenai perubahan tersebut melalui pemberitahuan dalam aplikasi atau cara lainnya. Dengan terus menggunakan aplikasi setelah perubahan, Anda dianggap menyetujui ketentuan baru tersebut.
        </Text>
        
        <Text className="text-lg font-bold text-dark mt-4 mb-2">6. Pengakhiran Layanan</Text>
        <Text className="text-base text-dark mb-4">
          Kami berhak untuk menangguhkan atau menghentikan akun Anda jika Anda melanggar ketentuan layanan ini. Anda dapat menghentikan penggunaan aplikasi kapan saja.
        </Text>
        
        <Text className="text-base text-dark font-medium mt-4">Terima kasih telah menggunakan Catat-Uang.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 px-2 pb-32 text-dark">
      <Text className="text-xl font-bold mb-4">Terms of Service</Text>
      
      <Text className="text-lg font-bold text-dark mt-2 mb-2">1. Service Description</Text>
      <Text className="text-base text-dark mb-4 text-justify">
        Catat-Uang is a personal finance logging application that allows you to manage your income and expenses. The app has a feature to scan shopping receipts using OCR (Optical Character Recognition) technology to speed up the logging process.
      </Text>
      
      <Text className="text-lg font-bold text-dark mt-2 mb-2">2. Limitations and Disclaimer</Text>
      <Text className="text-base text-dark mb-1 text-justify">
        This application is provided "as is" without any warranties. We strive to provide the best service, but there are some limitations you need to be aware of:
      </Text>
      <View className="ml-4">
        <Text className="text-base text-dark text-justify">• <Text className="font-medium text-dark">Server Limitations:</Text> The application runs on a server with limited resources. Therefore, the app may experience performance degradation, slowness, or even be inaccessible at times.</Text>
        <Text className="text-base text-dark text-justify">• <Text className="font-medium text-dark">OCR Limitations:</Text> The receipt scanning feature uses Tesseract.js OCR technology. This technology does not guarantee 100% accuracy. You are responsible for reviewing and editing the data generated by the OCR feature.</Text>
        <Text className="text-base text-dark text-justify">• <Text className="font-medium text-dark">API Limitations:</Text> We use the Gemini API for data processing. This API has daily usage limits as we are using a student trial package. If these limits are reached, the data processing feature (including OCR) may be temporarily unavailable until the limits are reset.</Text>
        <Text className="text-base text-dark text-justify">• <Text className="font-medium text-dark">No Financial Guarantee:</Text> The data you log in this application cannot be considered a formal financial report or professional advice. We are not responsible for any financial losses or other damages that may arise from the use or limitations of this application.</Text>
      </View>

      <Text className="text-lg font-bold text-dark mt-4 mb-2">3. User Rights and Obligations</Text>
      <View className="ml-4">
        <Text className="text-base text-dark mb-1 text-justify">• <Text className="font-medium text-dark">User Rights:</Text> You have the right to use the application for its intended purpose, which is to log and manage your personal finances.</Text>
        <Text className="text-base text-dark mb-1 text-justify">• <Text className="font-medium text-dark">User Obligations:</Text> You are fully responsible for all data you input and manage in the application. Ensure that the data you enter is accurate. You are also responsible for maintaining the security of your account.</Text>
        <Text className="text-base text-dark text-justify">• <Text className="font-medium text-dark">Prohibitions:</Text> You are prohibited from using the application for illegal purposes, violating copyrights, or uploading harmful content. You are also not permitted to attempt to illegally access or interfere with the application's system.</Text>
      </View>
      
      <Text className="text-lg font-bold text-dark mt-4 mb-2">4. Data Ownership</Text>
      <Text className="text-base text-dark mb-4">
        The personal financial data you enter into the application is entirely yours. We may use anonymous application usage data for internal analysis and feature development.
      </Text>
      
      <Text className="text-lg font-bold text-dark mt-4 mb-2">5. Changes to Terms</Text>
      <Text className="text-base text-dark mb-4">
        We reserve the right to modify these terms of service at any time. We will notify you of any changes through an in-app notification or other means. By continuing to use the application after a change, you are deemed to have agreed to the new terms.
      </Text>
      
      <Text className="text-lg font-bold text-dark mt-4 mb-2">6. Termination of Service</Text>
      <Text className="text-base text-dark mb-4">
        We reserve the right to suspend or terminate your account if you violate these terms of service. You may stop using the application at any time.
      </Text>
      
      <Text className="text-base text-dark font-medium mt-4">Thank you for using Catat-Uang.</Text>
    </View>
  );
};

const renderPrivacyPolicyContent = (lang: string | null) => {
  if(lang === 'id'){
    return (
      <View className="flex-1 p-4">
        <Text className="text-xl text-dark font-bold mb-4">Kebijakan Privasi</Text>
        <Text className="text-base text-dark mb-4 text-justify">
          Kami memahami bahwa data keuangan adalah hal yang sangat pribadi. Kami menggunakan data anda sesuai dengan kerperluan yang dibutuhkan layanan firebase.
        </Text>
        <Text className="text-base text-dark mb-2 text-justify">
          • <Text className="font-medium text-dark">Autentikasi Pengguna:</Text> Untuk memastikan keamanan akun, kami menggunakan email Anda sebagai sarana autentikasi melalui akun Gmail Anda.
        </Text>
        <Text className="text-base text-dark text-justify">
          • <Text className="font-medium text-dark">Kepercayaan dan Persetujuan:</Text> Dengan menggunakan aplikasi ini, Anda memberikan persetujuan untuk menyimpan dan memproses data keuangan Anda agar aplikasi dapat berjalan sebagaimana mestinya.
        </Text>
      </View>
    )
  }
  return (
    <View className="flex-1 p-4">
      <Text className="text-xl text-dark font-bold mb-4">Privacy Policy</Text>
      <Text className="text-base text-dark mb-4 text-justify">
        We understand that financial data is very personal. We use your data in accordance with the needs of Firebase services.
      </Text>
      <Text className="text-base text-dark mb-2 text-justify">
        • <Text className="font-medium text-dark">User Authentication:</Text> To ensure account security, we use your email as a means of authentication via your Gmail account.
      </Text>
      <Text className="text-base text-dark text-justify">
        • <Text className="font-medium text-dark">Trust and Consent:</Text> By using this application, you give your consent to store and process your financial data so that the app can function as intended.
      </Text>
    </View>
  )
}

const renderReportBugContent = (lang: string | null, isDarkColorScheme: boolean = false) => {
  if (lang === 'id') {
    return (
      <View className="flex-1 p-4">
        <Text className="text-xl text-dark font-bold mb-4">Laporkan Bug</Text>
        <Text className="text-base text-dark mb-4 text-justify">
          Jika Anda menemukan bug, error, atau masalah lain saat menggunakan aplikasi, mohon bantu kami dengan melaporkannya. Laporan Anda sangat berharga untuk meningkatkan kualitas aplikasi.
        </Text>
        <Text className="text-base text-dark font-medium mb-1 text-justify">
          Anda bisa melaporkan bug melalui halaman Issues pada repositori GitHub kami:
        </Text>
        <Button variant={isDarkColorScheme ? 'secondary' : 'default'} className="flex-row items-center mt-4" onPress={() => Linking.openURL('https://github.com/randy-ar/catat-uang/issues/new')}>
          <Github className="text-white me-2"/>
          <Text>
            Report Issue
          </Text>
        </Button>
      </View>
    );
  }
  return (
    <View className="flex-1 p-4">
      <Text className="text-xl text-dark font-bold mb-4">Report Bugs</Text>
      <Text className="text-base text-dark mb-4 text-justify">
        If you encounter any bugs, errors, or other issues while using the app, please help us by reporting them. Your report is very valuable for improving the app's quality.
      </Text>
      <Text className="text-base text-dark font-medium mb-1 text-justify">
        You can report bugs through the Issues page on our GitHub repository:
      </Text>
      <Button variant={isDarkColorScheme ? 'secondary' : 'default'} className="flex-row items-center mt-4" onPress={() => Linking.openURL('https://github.com/randy-ar/catat-uang/issues/new')}>
        <Github className="text-white me-2"/>
        <Text>
          Report Issue
        </Text>
      </Button>
    </View>
  );
};

const renderAboutAppsContent = (lang: string | null, isDarkColorScheme: boolean = false) => {
  if (lang === 'id') {
    return (
      <View className="flex-1 p-4 text-dark">
        <Text className="text-xl font-bold mb-4 text-dark">Tentang Aplikasi</Text>
        <Text className="text-base text-foreground mb-4 text-dark text-justify">
          Catat-Uang adalah aplikasi sumber terbuka (open-source) yang dikembangkan dengan tujuan membantu Anda mengelola keuangan pribadi.
        </Text>
        <Text className="text-base text-foreground font-medium mb-1 text-dark">
          Bergabung dan Berkontribusi:
        </Text>
        <Text className="text-base text-foreground mb-4 text-dark text-justify">
          Aplikasi ini bersifat terbuka untuk kolaborasi. Jika Anda tertarik untuk berkontribusi, baik sebagai pengembang atau dalam bentuk lain, silakan kunjungi repositori GitHub kami di:
        </Text>
        <Text className="text-base text-foreground font-medium mb-5 text-dark">
          Versi : {pkg.version}
        </Text>
        <Button variant={isDarkColorScheme ? 'secondary' : 'default'} className="flex-row items-center text-dark">
          <Github className="text-white me-2"/>
          <Text className="text-white" onPress={() => Linking.openURL('https://github.com/randy-ar/catat-uang')}>
            github.com/randy-ar/catat-uang
          </Text>
        </Button>
      </View>
    );
  }
  return (
    <View className="flex-1 p-4 text-dark">
      <Text className="text-xl font-bold mb-4 text-dark">About the App</Text>
      <Text className="text-base text-foreground mb-4 text-dark text-justify">
        Catat-Uang is an open-source application developed with the goal of helping you manage your personal finances.
      </Text>
      <Text className="text-base text-foreground font-medium mb-1 text-dark">
        Join and Contribute:
      </Text>
      <Text className="text-base text-foreground mb-4 text-dark text-justify">
        This application is open for collaboration. If you are interested in contributing, whether as a developer or in another form, please visit our GitHub repository at:
      </Text>
      <Text className="text-base text-foreground font-medium mb-5 text-dark">
        Version : {pkg.version}
      </Text>
      <Button variant={isDarkColorScheme ? 'secondary' : 'default'} className="flex-row items-center text-dark">
        <Github className="text-white me-2"/>
        <Text className="text-white" onPress={() => Linking.openURL('https://github.com/randy-ar/catat-uang')}>
          github.com/randy-ar/catat-uang
        </Text>
      </Button>
    </View>
  );
};

const SettingScreen = () => {
  const { dismiss } = useBottomSheetModal();
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const auth = getAuth();
  const colorScheme = useColorScheme();
  const { signOut, lang, setLang } = useSession();
  const [bottomSheetRender, setBottomSheetRender] = useState<JSX.Element>();
  const logOut = () => {
    auth.signOut().finally(() => {
      signOut();
    });
  }
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback((render: () => JSX.Element) => {
    bottomSheetModalRef.current?.present();
    setBottomSheetRender(render);
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // variables
	const snapPoints = useMemo(() => ["40%", "60%", "100%"], []);

	// renders
	const renderBackdrop = useCallback(
		(props : any) => (
			<BottomSheetBackdrop
				{...props}
        onPress={dismiss}
        opacity={0.7}
				disappearsOnIndex={-1}
			/>
		),
		[]
	);
  

  
    function toggleColorScheme() {
      const newTheme = isDarkColorScheme ? 'light' : 'dark';
      setColorScheme(newTheme);
      setAndroidNavigationBar(newTheme);
    }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("user : ", user);
      setUser(user);
    });
    return unsubscribe;
  }, []);
  
  return ( 
    <ScrollView className="flex-1 text-foreground">
      <View className="flex-1 min-h-screen p-8">
        <Text className="text-xl font-bold mb-4">Account</Text>
        <Card className="shadow-none mb-4">
          <CardContent className="py-4 px-3 flex flex-row justify-between items-center">
            {user?.emailVerified ? (
              <UserCheck2 className="inline text-foreground me-3"/>
            ) : (
              <User className="inline text-foreground me-3"/>
            )}
            <Text className="grow text-lg font-medium">
              {user?.email ?? '-'}
            </Text>
          </CardContent>
        </Card>
        <Text className="text-xl font-bold my-4">Settings</Text>
        <Card className="shadow-none mb-4">
          <CardContent className="py-4 px-3 flex flex-row justify-between items-center">
            <Languages className="inline text-foreground me-3"/>
            <Text className="grow text-lg font-medium">
              ID (Bahasa) <Text className="text-stone-600 text-xs mb-auto">Beta Version</Text>
            </Text>
            <Switch checked={lang === 'id'} onCheckedChange={lang === 'id' ? () => setLang('en') : () => setLang('id')}/>
          </CardContent>
        </Card>
        <Card className="shadow-none mb-4">
          <CardContent className="py-4 px-3 flex flex-row justify-between items-center">
            {colorScheme.colorScheme === 'dark' ? (
              <MoonStar className="inline text-foreground me-3"/>
            ) : (
              <Sun className="inline text-foreground me-3"/>
            )}
            <Text className="grow text-lg font-medium">
              Dark Mode
            </Text>
            <Switch checked={colorScheme.colorScheme === 'dark'} onCheckedChange={toggleColorScheme}/>
          </CardContent>
        </Card>
        <Text className="text-xl font-bold my-4">More Information</Text>
        <TouchableOpacity onPress={() => {
          handlePresentModalPress(() => (
            renderHelpContent(lang, isDarkColorScheme)
          ));
        }}
        >
          <Card className="shadow-none mb-2">
            <CardContent className="py-4 px-3 flex flex-row justify-between items-center">
              <HelpCircle className="inline text-foreground me-3"/> 
              <Text className="grow text-lg font-medium">
                Help
              </Text>
              <ChevronRight className="inline text-foreground"/>
            </CardContent>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            handlePresentModalPress(() => (
              renderTermsOfServiceContent(lang)
            ))
          }}
        >
          <Card className="shadow-none mb-2">
            <CardContent className="py-4 px-3 flex flex-row justify-between items-center">
              <Handshake className="inline text-foreground me-3"/> 
              <Text className="grow text-lg font-medium">
                Terms of Service
              </Text>
              <ChevronRight className="inline text-foreground"/>
            </CardContent>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            handlePresentModalPress(() => (
              renderPrivacyPolicyContent(lang)
            ))
          }}
        >
          <Card className="shadow-none mb-2">
            <CardContent className="py-4 px-3 flex flex-row justify-between items-center">
              <Lock className="inline text-foreground me-3"/> 
              <Text className="grow text-lg font-medium">
                Privacy Policy
              </Text>
              <ChevronRight className="inline text-foreground"/>
            </CardContent>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          handlePresentModalPress(() => (
            renderReportBugContent(lang, isDarkColorScheme)
          ))
            }}
        >
          <Card className="shadow-none mb-2">
            <CardContent className="py-4 px-3 flex flex-row justify-between items-center">
              <Bug className="inline text-foreground me-3"/> 
              <Text className="grow text-lg font-medium">
                Report Bugs
              </Text>
              <ChevronRight className="inline text-foreground"/>
            </CardContent>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          handlePresentModalPress(() => (
            renderAboutAppsContent(lang, isDarkColorScheme)
          ))
            }}
        >
          <Card className="shadow-none mb-2">
            <CardContent className="py-4 px-3 flex flex-row justify-between items-center">
              <Info className="inline text-foreground me-3"/> 
              <Text className="grow text-lg font-medium">
                About Apps
              </Text>
              <ChevronRight className="inline text-foreground"/>
            </CardContent>
          </Card>
        </TouchableOpacity>
        <Button variant="destructive" className="flex flex-row items-center justify-center mt-24" onPress={() => {
          logOut();
        }}>
          <LogOut size={16} color={'white'} />
          <Text className="text-sm ms-2 font-medium">Sign Out</Text>
        </Button>
        <Small className="text-center text-sm my-8 text-stone-400">Version : {pkg.version}</Small>
        <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
            index={1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enableDynamicSizing={false}
          >
            <BottomSheetScrollView className="flex-1 p-8">
              {bottomSheetRender ?? (
                <View>
                  <Text>Nothing to show here!</Text>
                </View>
              )}
            </BottomSheetScrollView>
        </BottomSheetModal>
      </View>
    </ScrollView>
   );
}
 
export default SettingScreen;