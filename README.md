# Kelime Bilgisi Quiz Uygulaması

## Giriş
Bir süredir, hangi kelimeleri bilip bilmediğimi kolayca ortaya çıkarabilecek bir araç arıyordum. Ancak, ihtiyaçlarımı tam olarak karşılayan bir uygulama bulamadım. Bu yüzden, **Vocabulary Quiz App** adında basit, sezgisel ve geliştirilebilir bir uygulama tasarlamaya karar verdim. Bu uygulama, kelime bilginizi test etmenizi kolaylaştırır.

Bu uygulama:
- **Üç dil seçeneği** sunar: İngilizce, İtalyanca ve Almanca.
- **Üç zorluk seviyesi** içerir: Başlangıç, Orta ve İleri.
- İlerlemenizi takip eder ve sonuçlarınızı dışa aktarmanıza olanak tanır.

## Özellikler
- **İlerlemenizi Takip Edin**: Uygulama, `localStorage` ile ilerlemenizi kaydeder. Herhangi bir zamanda kaldığınız yerden devam edebilirsiniz.
- **Sonuçları Dışa Aktarın**: Quiz sonuçlarınızı Excel dosyası olarak dışa aktarın.
- **Etkileşimli Grafikler**: Doğru, yanlış ve atlanan cevaplarınızı görsel olarak inceleyin.
- **Telaffuz Desteği**: `SpeechSynthesis` kullanarak kelimelerin doğru telaffuzunu dinleyin.
- **Quiz Sıfırlama**: İlerlemenizi sıfırlayarak yeni bir quiz başlatabilirsiniz.

## Nasıl Kullanılır?
1. **Dil ve Seviye Seçin**:
   İngilizce 🇬🇧, İtalyanca 🇮🇹 veya Almanca 🇩🇪 dillerinden birini seçin. Ardından Başlangıç, Orta veya İleri seviyelerinden birini belirleyin.
2. **Quiz'i Çözün**:
   Kelimeler birer birer ekrana gelir. Doğru anlamı seçin veya emin değilseniz kelimeyi atlayın.
3. **Sonuçları Görüntüleyin**:
   Performansınızı detaylı bir tablo veya pasta grafik üzerinden inceleyin.
4. **Sonuçları Dışa Aktarın**:
   Sonuçlarınızı analiz etmek için Excel dosyası olarak dışa aktarın.
5. **Quiz'i Sıfırlayın**:
   İlerlemenizi sıfırlayarak quiz'e sıfırdan başlayabilirsiniz.

## Gelecek Planlar
- **Durum Yönetimi Kütüphaneleri**: Daha iyi ölçeklenebilirlik ve sürdürülebilirlik için `Recoil`, `Zustand` gibi kütüphaneler entegre edilebilir.
- **Ek Diller ve Seviyeler**: Daha fazla dil ve zorluk seviyesi desteği için katkılarınızı bekliyoruz.
- **Kişisel Kelime Listeleri**: Kullanıcıların kendi kelime listelerini yükleyerek kişiselleştirilmiş quiz oluşturması sağlanabilir.

## Katkıda Bulunun
Bu uygulamanın geliştirilmesine destek olmak isterseniz, lütfen issue açabilir, özellik önerisinde bulunabilir veya pull request gönderebilirsiniz. Birlikte bu aracı daha kapsamlı hale getirebiliriz!

## Kullanılan Teknolojiler
- **React**: UI geliştirme için.
- **Tailwind CSS**: Modern ve responsive tasarım.
- **Chart.js**: Performans görselleştirme.
- **XLSX**: Excel'e sonuç aktarma.
- **SpeechSynthesis API**: Kelime telaffuzu için.

## Lisans
Bu proje açık kaynaklıdır ve [MIT Lisansı](LICENSE) ile lisanslanmıştır.

---


# Vocabulary Quiz App

## Introduction
I often found myself searching for a tool that could easily help me identify which words I know and which I don't. Surprisingly, I couldn't find an application that met my needs. So, I decided to create **Vocabulary Quiz App**, a simple, intuitive, and extensible tool to help users test their vocabulary knowledge.

This application provides:
- **Three language options**: English, Italian, and German.
- **Three difficulty levels**: Beginner, Intermediate, and Advanced.
- A seamless interface that tracks your progress and allows you to export results.

## Features
- **Track Your Progress**: The app uses `localStorage` to remember your progress. You can pause and resume at any time without losing your data.
- **Export Results**: Export your quiz results as an Excel file to review later.
- **Interactive Charts**: View your performance visually with pie charts showing correct, wrong, and skipped answers.
- **Speech Functionality**: Listen to the pronunciation of the words using `SpeechSynthesis`.
- **Quiz Reset**: Reset your progress to start fresh.

## How to Use
1. **Select a Language and Level**:
   Choose between English 🇬🇧, Italian 🇮🇹, or German 🇩🇪. Then pick a difficulty level: Beginner, Intermediate, or Advanced.
2. **Answer the Quiz**:
   Words will appear one by one. Choose the correct meaning or skip the word if you're unsure.
3. **View Results**:
   Check your performance through a detailed result table or a pie chart.
4. **Export Results**:
   Export your results to an Excel file for further analysis.
5. **Reset Quiz**:
   Reset your progress and start a new quiz anytime.

## Future Plans
- **State Management Libraries**: To enhance scalability and maintainability, support for `Recoil`, `Zustand`, or similar state management tools can be integrated.
- **Additional Languages and Levels**: Contributions to support more languages and difficulty levels are welcome.
- **Custom Word Lists**: Users may upload their own word lists for personalized quizzes.

## Contribute
If you'd like to support the development of this app, feel free to open issues, suggest features, or submit pull requests. Together, we can expand this tool to support more languages, levels, and features!

## Technologies Used
- **React**: UI framework.
- **Tailwind CSS**: For responsive and modern design.
- **Chart.js**: To visualize performance.
- **XLSX**: For exporting results to Excel.
- **SpeechSynthesis API**: For word pronunciation.

## License
This project is open-source and licensed under the [MIT License](LICENSE).


