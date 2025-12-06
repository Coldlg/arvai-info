async function copyText() {
  const textElement = document.getElementById("textToCopy");
  const text = textElement.innerText; // Or textElement.value for input/textarea

  try {
    await navigator.clipboard.writeText(text);
    alert("Данс хуулсан!");
  } catch (err) {
    console.error("Failed to copy text: ", err);
    alert("Данс хуулсангүй!");
  }
}

export const lotteries = [
  // {
  //   id: 1,
  //   title: "TOYOTA HARRIER",
  //   description: "",
  //   ticketsAvailable: 660,
  //   maximumTickets: 1660,
  //   price: 50000,
  //   drawDate: "2024-12-15",
  //   image:
  //     "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/571199906_122238381152249002_2895375410274191345_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=f5OwJmfmsIgQ7kNvwGphT_2&_nc_oc=AdkI2CjGIbVLCYkyQ1N3NyNtnZ2vxKTZyj3_OEyy2be7P3KV0UioEGCpn4Hf4YX2TFU&_nc_zt=23&_nc_ht=scontent-nrt1-1.xx&_nc_gid=ZEMAnbBy1BwmSVp2LNpdTg&oh=00_Afc6iGGbkwKbNWQEqDDDfVfJVp3aGm4jVK6jgAasPSGBJQ&oe=690668F8",
  // },
  {
    id: 2,
    title: "Lexus RX450 Version L",
    price: 10000,
    description: (
      <>
        Нийт 11500 эрхээс 42 азтан тодроно 1️⃣#СУПЕР_АЗТАН_LEXUS_RX450 2️⃣#ЦОО_ШИНЭ_IPHONE
        <br></br>3️⃣-42 Дараагийн сугалааны 5/5 эрх <br />
        ✅Данс:{" "}
        <p className="cursor-pointer" id="textToCopy" onClick={copyText}>
          MN840005005402991420
        </p>
        (Хаан банк Дуламсүрэн)
        <br />
        ✅Нэг сугалааны эрх <span className="font-semibold text-green-600">10.000₮</span>
        <br />
        ✅Гүйлгээний утга: Утасны дугаар
      </>
    ),
    ticketsSold: 4413,
    maximumTickets: 11500,
    drawDate: "2025-01-20",
    image: "photos/image1.jpg",
    images: [
      "photos/image1.jpg",
      "photos/image2.jpg",
      "photos/Facebook Image (2).jpg",
      "photos/Facebook Image (3).jpg",
      "photos/Facebook Image (4).jpg",
      "photos/Facebook Image (5).jpg",
      "photos/Facebook Image (6).jpg",
      "photos/Facebook Image (7).jpg",
    ],
  },
  {
    id: 3,
    title: "LC300",
    price: 60000,
    description: (
      <>
        Нийт 11500 эрхээс 42 азтан тодроно 1️⃣#СУПЕР_АЗТАН_LAND_CRUISER_300 2️⃣#ЦОО_ШИНЭ_IPHONE
        <br></br>3️⃣-6️⃣2️⃣Дараагийн сугалааны 10/10 эрх
        <br />
        ✅Данс:{" "}
        <p className="cursor-pointer" id="textToCopy" onClick={copyText}>
          MN170005005402758177
        </p>
        (Хаан банк Цэндсүрэн)
        <br />
        ✅Нэг сугалааны эрх <span className="font-semibold text-green-600">25.000₮</span>
        <br />
        ✅Гүйлгээний утга: Утасны дугаар
      </>
    ),
    ticketsSold: 1346,
    maximumTickets: 10666,
    drawDate: "2024-12-30",
    image: "photos2/Facebook Image.jpg",
    images: [
      "photos2/Facebook Image.jpg",
      "photos2/Facebook Image (1).jpg",
      "photos2/Facebook Image (2).jpg",
      "photos2/Facebook Image (3).jpg",
      "photos2/Facebook Image (4).jpg",
    ],
  },
];

export const cars = [
  {
    id: 1,
    make: "Toyota",
    model: "Corolla",
    year: 2017,
    price: 14200000,
    mileage_km: 72500,
    color: "Silver",
    engine: "1.8L 4-cylinder",
    transmission: "Automatic",
    rating: 4.2,
    description:
      "Well-maintained Toyota Corolla with recently installed second-hand gears. Transmission upgraded with a refurbished unit. Interior and exterior in excellent shape, with minimal wear.",
    image:
      "https://tmna.aemassets.toyota.com/is/image/toyota/toyota/jellies/max/2026/corolla/xse/1866/1k3/36/5.png?fmt=png-alpha&wid=930&hei=328&qlt=90",
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    year: 2015,
    price: 11300000,
    mileage_km: 128000,
    color: "Blue",
    engine: "2.0L 4-cylinder",
    transmission: "Manual",
    rating: 3.9,
    description:
      "Honda Civic equipped with a second-hand gearbox installed six months ago. Smooth gear shifts and recently serviced A/C. Clean interior with light wear and 50% tire life remaining.",
    image:
      "https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2026/civic-sedan/non-VLP/10-Family/MY26_Civic_Family_Card_Jelly_2x.png?sc_lang=en",
  },
  {
    id: 3,
    make: "Ford",
    model: "Mustang",
    year: 2018,
    price: 23500000,
    mileage_km: 48000,
    color: "Red",
    engine: "5.0L V8",
    transmission: "Automatic",
    rating: 4.4,
    description:
      "Ford Mustang with performance-enhanced second-hand sports gears and refurbished differential. Premium leather seats and upgraded sound system. Excellent mechanical and cosmetic condition.",
    image: "https://imgd.aeplcdn.com/664x374/cw/ec/23766/Ford-Mustang-Exterior-126883.jpg?wm=0&q=80",
  },
  {
    id: 4,
    make: "BMW",
    model: "3 Series",
    year: 2016,
    price: 16900000,
    mileage_km: 88500,
    color: "Black",
    engine: "2.0L I4 Turbo",
    transmission: "Manual",
    rating: 4.0,
    description:
      "BMW 3 Series with second-hand gearbox and refurbished engine components for improved efficiency. Luxurious interior and new brake pads and rotors installed recently.",
    image:
      "https://www.bmw-me.com/content/dam/bmw/common/all-models/3-series/sedan/2024/navigation/bmw-3-series-phev-lci-modelfinder.png.asset.1716814924098.png",
  },
  {
    id: 5,
    make: "Chevrolet",
    model: "Silverado",
    year: 2019,
    price: 31000000,
    mileage_km: 64500,
    color: "White",
    engine: "5.3L V8",
    transmission: "Automatic",
    rating: 4.3,
    description:
      "Chevrolet Silverado with a replaced second-hand differential for better towing performance. Clean truck bed and serviced A/C. Minimal wear and well-kept cabin.",
    image:
      "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/vdc-collections/2025/trucks/silverado-1500/models/02-images/2025-silverado-ck10543-2lt-gbd-trimselector.png?imwidth=1200",
  },
  {
    id: 6,
    make: "Nissan",
    model: "Altima",
    year: 2017,
    price: 12900000,
    mileage_km: 96500,
    color: "Grey",
    engine: "2.5L 4-cylinder",
    transmission: "CVT",
    rating: 3.8,
    description:
      "Nissan Altima fitted with a second-hand CVT transmission installed 20,000 km ago. Smooth driving and recently serviced. Small paint chips but overall in great working condition.",
    image:
      "https://ms-prd-nna.use.mediaserver.heliosnissan.net/iris/iris?vehicle=8_L34&resp=png&bkgnd=transparent&pov=E01&w=5781&h=5370&x=1719&y=1481&height=250&width=660&paint=KAD&fabric=N&brand=nisnna&sa=1_B,2_DB,4_A,5_L,6_S,7_Z,11_D,12_U,13_A,SHADOW_ON,PI_ON,PE_ON,2025&imwidth=3840",
  },
  {
    id: 7,
    make: "Audi",
    model: "A4",
    year: 2020,
    price: 26500000,
    mileage_km: 40000,
    color: "White",
    engine: "2.0L I4 Turbo",
    transmission: "Automatic",
    rating: 4.5,
    description:
      "Audi A4 with professionally installed second-hand transmission for improved gear response. Includes luxury tech package, navigation, and premium audio. Like-new condition.",
    image:
      "https://media.audi.com/is/image/audi/nemo/uk/models/a4-saloon/trims/my-23-trims/mobile/a4_Saloon_sport_34_1280x1080px.png?width=768",
  },
  {
    id: 8,
    make: "Jeep",
    model: "Wrangler",
    year: 2016,
    price: 20500000,
    mileage_km: 112000,
    color: "Olive Green",
    engine: "3.6L V6",
    transmission: "Manual",
    rating: 4.1,
    description:
      "Jeep Wrangler upgraded with a second-hand gearbox to improve off-road performance. Includes heavy-duty suspension. Minor off-road wear consistent with age.",
    image:
      "https://images.hgmsites.net/med/2025-jeep-wrangler-sport-s-2-door-4x4-angular-front-exterior-view_100967699_m.webp",
  },
  {
    id: 9,
    make: "Mazda",
    model: "6",
    year: 2018,
    price: 14900000,
    mileage_km: 80500,
    color: "Red",
    engine: "2.5L 4-cylinder Turbo",
    transmission: "Automatic",
    rating: 4.0,
    description:
      "Mazda 6 with a second-hand turbo engine installed for added performance. Clean red finish and well-maintained leather interior. Infotainment system recently upgraded.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB43w4YaLcLb_C2k3AKTtQPvmw9wp5RjX3lw&s",
  },
  {
    id: 10,
    make: "Hyundai",
    model: "Elantra",
    year: 2020,
    price: 15200000,
    mileage_km: 56500,
    color: "White",
    engine: "2.0L 4-cylinder",
    transmission: "CVT",
    rating: 4.3,
    description:
      "Hyundai Elantra equipped with refurbished second-hand CVT gears. Excellent ride comfort, recently serviced, and clean both inside and out.",
    image: "https://5.imimg.com/data5/HP/HD/GLADMIN-60424495/hyundai-elentra-car-500x500.png",
  },
];

export const lotteryCars = [
  {
    id: 1,
  },
];
