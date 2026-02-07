import { motion } from "framer-motion";
import { Camera, Heart } from "lucide-react";
import image1 from "@/assets/images/image1.jpeg";
import image2 from "@/assets/images/image2.jpeg";
import image3 from "@/assets/images/image3.jpeg";
import image4 from "@/assets/images/image4.jpeg";
import image5 from "@/assets/images/image5.jpeg";
import image6 from "@/assets/images/image6.jpeg";
import image7 from "@/assets/images/image7.jpeg";
import image8 from "@/assets/images/image8.jpeg";
import image9 from "@/assets/images/image9.jpeg";
import image10 from "@/assets/images/image10.jpeg";
import image11 from "@/assets/images/image11.jpeg";
import image12 from "@/assets/images/image12.jpeg";
import image13 from "@/assets/images/image13.jpeg";
import image14 from "@/assets/images/image14.jpeg";
import image15 from "@/assets/images/image15.jpeg";
import image16 from "@/assets/images/image16.jpeg";
import image17 from "@/assets/images/image17.jpeg";
import image18 from "@/assets/images/image18.jpeg";
import image19 from "@/assets/images/image19.jpeg";
import image20 from "@/assets/images/image20.jpeg";
import image21 from "@/assets/images/image21.jpeg";
import image22 from "@/assets/images/image22.jpeg";
import image23 from "@/assets/images/image23.jpeg";
import image24 from "@/assets/images/image24.jpeg";
import image25 from "@/assets/images/image25.jpeg";
import image26 from "@/assets/images/image26.jpeg";
import image27 from "@/assets/images/image27.jpeg";
import image28 from "@/assets/images/image28.jpeg";
import image29 from "@/assets/images/image29.jpeg";
import image30 from "@/assets/images/image30.jpeg";
import image31 from "@/assets/images/image31.jpeg";
import image32 from "@/assets/images/image32.jpeg";
import image33 from "@/assets/images/image33.jpeg";
import image34 from "@/assets/images/image34.jpeg";
import image35 from "@/assets/images/image35.jpeg";
import image36 from "@/assets/images/image36.jpeg";
import image37 from "@/assets/images/image37.jpeg";
import image38 from "@/assets/images/image38.jpeg";
import image39 from "@/assets/images/image39.jpeg";
import image40 from "@/assets/images/image40.jpeg";
import image41 from "@/assets/images/image41.jpeg";
import image42 from "@/assets/images/image42.jpeg";
import image43 from "@/assets/images/image43.jpeg";
import image44 from "@/assets/images/image44.jpeg";
import image45 from "@/assets/images/image45.jpeg";
import image46 from "@/assets/images/image46.jpeg";
import image47 from "@/assets/images/image47.jpeg";
import image48 from "@/assets/images/image48.jpeg";
import image49 from "@/assets/images/image49.jpeg";
import image50 from "@/assets/images/image50.jpeg";
import image51 from "@/assets/images/image51.jpeg";
import image52 from "@/assets/images/image52.jpeg";
import image53 from "@/assets/images/image53.jpeg";
import image54 from "@/assets/images/image54.jpeg";
import image55 from "@/assets/images/image55.jpeg";
import image56 from "@/assets/images/image56.jpeg";
import image57 from "@/assets/images/image57.jpeg";
import image58 from "@/assets/images/image58.jpeg";
import image59 from "@/assets/images/image59.jpeg";
import image60 from "@/assets/images/image60.jpeg";

// ============================================
// 📸 ADD YOUR PHOTOS HERE!
// Replace these placeholder URLs with your actual photos
// ============================================
const photos = [
  { url: image1, caption: "Yooborne Touti" },
  { url: image2, caption: "Jamela w alba" },
  { url: image3, caption: "When do we get some fun" },
  { url: image4, caption: "Lello Zaabir" },
  { url: image5, caption: "Tizik" },
  { url: image6, caption: "Us taking some photos" },
  { url: image7, caption: "My Birthday surprise" },
  { url: image8, caption: "After we fight, we never forget that we love each other" },
  { url: image9, caption: "And we never forget that Touti loves to eat 😄" },
  { url: image10, caption: "The most laughing moments are the best" },
  { url: image11, caption: "Why so serious?" },
  { url: image12, caption: "Our best moment" },
  { url: image13, caption: "Best day of our life ❤️❤️❤️" },
  { url: image14, caption: "We hold each other even at our worst" },
  { url: image15, caption: "And again, we forget everything in life and start laughing" },
  { url: image16, caption: "Cutie ammour" },
  { url: image17, caption: "My big nose" },
  { url: image18, caption: "We grow old together, surrounded by these great moments filled with laughter" },
  { url: image19, caption: "Our beautiful dates" },
  { url: image20, caption: "Worst Work for Touti" },
  { url: image21, caption: "YA RABBE TSABBERNE" },
  { url: image22, caption: "Sha3nine" },
  { url: image23, caption: "Ya3ame ma taeemle shfefik" },
  { url: image24, caption: "Fhemte aw b3id?" },
  { url: image25, caption: "ok ya rouhe tekram" },
  { url: image26, caption: "❤️" },
  { url: image27, caption: "Faqra" },
  { url: image28, caption: "Wlek hatta make up" },
  { url: image29, caption: "Your birthday surprise❤️" },
  { url: image30, caption: "Our futur life" },
  { url: image31, caption: "Share every single detail" },
  { url: image32, caption: "Christmas❤️" },
  { url: image33, caption: "Ftah Video Call" },
  { url: image34, caption: "Lello ala3etne" },
  { url: image35, caption: "Men baeed ma ze3il lello w touti radeto" },
  { url: image36, caption: "Wlak shu majdoub?" },
  { url: image38, caption: "2nd Christmas together" },
  { url: image39, caption: "Annual Company's Dinner" },
  { url: image40, caption: "Shefle tal3a wara dayente?" },
  { url: image41, caption: "New Year" },
  { url: image42, caption: "Fik thotele oil?" },
  { url: image43, caption: "Our Annual December Chez Michel wa akhiran" },
  { url: image44, caption: "Enta 3melet toz?" },
  { url: image45, caption: "Yooborne l amar ana" },
  { url: image46, caption: "HAHAHHAHA" },
  { url: image47, caption: "Bhebbik" },
  { url: image48, caption: "Wlakkk zihhhhh" },
  { url: image49, caption: "Bade aamelak facial, eh okk okk" },
  { url: image51, caption: "Lello battoune wawa" },
  { url: image52, caption: "Bas lello ysawrik" },
  { url: image53, caption: "Aniak new year fike ya asia" },
  { url: image54, caption: "HAHAHAHAHAHA" },
  { url: image55, caption: "My little girl" },
  { url: image56, caption: "Lello JMAD" },
  { url: image57, caption: "❤️❤️❤️❤️" },
  { url: image58, caption: "Ma nensa l ascenseur l ha nohbut fi ba3ed shi nhar" },
];

export const MemoryLane = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Camera size={20} className="text-muted-foreground" />
        <h3 className="text-lg font-display font-semibold text-foreground">Memory Lane</h3>
      </div>

      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 snap-center first:ml-0"
            >
              <div className="relative w-48 h-64 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-sm font-medium text-primary-foreground">{photo.caption}</p>
                </div>
                <div className="absolute top-3 right-3">
                  <Heart className="text-primary-foreground drop-shadow-lg" size={20} fill="currentColor" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center mt-2">
          <p className="text-xs text-muted-foreground">← Swipe to see more →</p>
        </div>
      </div>
    </div>
  );
};
