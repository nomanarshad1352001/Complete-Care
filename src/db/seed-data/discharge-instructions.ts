import type { NewResource } from "../schema";

const reviewed = "2025-11-10";

export const dischargeInstructions: NewResource[] = [
  {
    slug: "general-discharge-instructions",
    category: "discharge-instructions",
    sortOrder: 1,
    featured: true,
    lastReviewed: reviewed,
    titleEn: "General Discharge Instructions After Surgery",
    titleEs: "Instrucciones Generales de Alta Después de la Cirugía",
    summaryEn:
      "Your first days at home after surgery: activity, wound care, medicines, warning signs, and follow-up basics that apply to most procedures.",
    summaryEs:
      "Sus primeros días en casa después de la cirugía: actividad, cuidado de la herida, medicamentos, señales de alerta y conceptos básicos de seguimiento.",
    keywords:
      "discharge, going home, after surgery, alta, ir a casa, después de cirugía",
    contentEn: `These general instructions apply to most procedures. If your surgeon gave you procedure-specific instructions, those come first.
## Activity
- Rest today. Walk short distances around your home several times a day to prevent blood clots.
- Do not drive for at least 24 hours after anesthesia, or while taking opioid pain medicine.
- Follow the lifting, bending, and weight-bearing limits given for your procedure.
## Your incision
- Keep the dressing clean and dry unless told otherwise.
- Do not soak in a bathtub, pool, or hot tub until the wound is fully healed and your surgeon approves.
- Wash your hands before and after touching the area.
## Medicines
- Take pain medicine only as prescribed. Many patients can switch to acetaminophen or ibuprofen within a few days — ask your team.
- If you were prescribed a blood thinner, take it exactly on schedule.
- Finish antibiotics if prescribed, even if you feel fine.
## Call our office if you have
- Fever of 100.4°F (38°C) or higher.
- Spreading redness, warmth, or pus from the incision.
- Pain that gets worse instead of better after day 3.
- Swelling or tenderness in one calf.
## Go to the emergency room or call 911 for
- Chest pain, trouble breathing, or coughing up blood.
- Weakness on one side, trouble speaking, or sudden confusion.
- Bleeding that soaks through the dressing and does not stop with pressure.
## Follow-up
- Keep your follow-up appointment even if you feel great — it is how we confirm you are healing correctly.
> Keep this sheet on your refrigerator. It answers most questions that come up in the first week.`,
    contentEs: `Estas instrucciones generales aplican a la mayoría de los procedimientos. Si su cirujano le dio instrucciones específicas para su procedimiento, esas tienen prioridad.
## Actividad
- Descanse hoy. Camine distancias cortas por su casa varias veces al día para prevenir coágulos de sangre.
- No conduzca durante al menos 24 horas después de la anestesia, ni mientras tome medicamentos opioides para el dolor.
- Siga los límites de levantamiento, flexión y apoyo de peso indicados para su procedimiento.
## Su incisión
- Mantenga el vendaje limpio y seco, salvo indicación contraria.
- No se sumerja en bañera, piscina ni jacuzzi hasta que la herida esté completamente cicatrizada y su cirujano lo apruebe.
- Lávese las manos antes y después de tocar la zona.
## Medicamentos
- Tome el medicamento para el dolor solo como se recetó. Muchos pacientes pueden cambiar a acetaminofén o ibuprofeno en unos días; pregunte a su equipo.
- Si se le recetó un anticoagulante, tómelo exactamente en horario.
- Termine los antibióticos si se recetaron, aunque se sienta bien.
## Llame a nuestra oficina si tiene
- Fiebre de 100.4°F (38°C) o más.
- Enrojecimiento que se extiende, calor o pus en la incisión.
- Dolor que empeora en lugar de mejorar después del día 3.
- Hinchazón o sensibilidad en una pantorrilla.
## Vaya a la sala de emergencias o llame al 911 si tiene
- Dolor de pecho, dificultad para respirar o tos con sangre.
- Debilidad en un lado, dificultad para hablar o confusión repentina.
- Sangrado que empapa el vendaje y no se detiene con presión.
## Seguimiento
- Asista a su cita de seguimiento aunque se sienta muy bien: es como confirmamos que está sanando correctamente.
> Mantenga esta hoja en el refrigerador. Responde la mayoría de las preguntas que surgen en la primera semana.`,
  },
  {
    slug: "wound-care-at-home",
    category: "discharge-instructions",
    sortOrder: 2,
    lastReviewed: reviewed,
    titleEn: "Wound Care & Dressing Instructions",
    titleEs: "Cuidado de la Herida e Instrucciones de Vendaje",
    summaryEn:
      "How to care for your incision and dressing at home, when you can shower, and which signs of infection to watch for.",
    summaryEs:
      "Cómo cuidar su incisión y vendaje en casa, cuándo puede ducharse y qué señales de infección vigilar.",
    keywords: "wound care, dressing, incision, stitches, herida, vendaje, incisión",
    contentEn: `Good wound care lowers infection risk and helps your scar heal well.
## Caring for your dressing
- Keep the dressing clean and dry for the first 48 to 72 hours unless your team says otherwise.
- If the dressing gets wet or dirty, replace it with a clean, dry one — wash your hands first.
- Do not apply ointments, creams, or home remedies to the incision unless prescribed.
## Showering
- Most patients may shower 48 to 72 hours after surgery, letting soapy water run over the wound — follow your specific instructions.
- Pat the area dry. Never rub it.
- Do not soak the wound in a bath, pool, ocean, or hot tub until cleared.
## Stitches, staples, and strips
- Paper strips (Steri-Strips) fall off on their own — let them. Do not pull them.
- Stitches and staples are usually removed at 10 to 14 days during your follow-up.
- Glue (Dermabond) flakes off by itself over 1 to 2 weeks. Do not pick at it.
## Signs of infection — call us if you notice
- Redness that spreads beyond the edges of the incision.
- Increasing warmth, swelling, or pain at the site.
- Thick, cloudy, or bad-smelling drainage.
- Fever of 100.4°F (38°C) or higher.
## Normal healing vs. trouble
- A little clear or light-pink drainage, mild itching, and firmness around the scar are normal.
- Opening of the wound, gapping edges, or heavy drainage are not — call us.
> Smoking slows wound healing. If you smoke, this is the most important time not to.`,
    contentEs: `Un buen cuidado de la herida reduce el riesgo de infección y ayuda a que su cicatriz sane bien.
## Cuidado del vendaje
- Mantenga el vendaje limpio y seco durante las primeras 48 a 72 horas, a menos que su equipo indique lo contrario.
- Si el vendaje se moja o se ensucia, reemplácelo con uno limpio y seco; lávese las manos primero.
- No aplique ungüentos, cremas ni remedios caseros en la incisión a menos que se receten.
## Ducharse
- La mayoría de los pacientes pueden ducharse 48 a 72 horas después de la cirugía, dejando correr agua con jabón sobre la herida; siga sus instrucciones específicas.
- Seque el área con toques suaves. Nunca la frote.
- No sumerja la herida en bañera, piscina, mar ni jacuzzi hasta que se le autorice.
## Puntos, grapas y tiras
- Las tiras de papel (Steri-Strips) se caen solas; déjelas. No las jale.
- Los puntos y grapas generalmente se retiran entre los 10 y 14 días durante su seguimiento.
- El pegamento (Dermabond) se desprende solo en 1 a 2 semanas. No lo rasque.
## Señales de infección: llámenos si nota
- Enrojecimiento que se extiende más allá de los bordes de la incisión.
- Aumento de calor, hinchazón o dolor en el sitio.
- Secreción espesa, turbia o con mal olor.
- Fiebre de 100.4°F (38°C) o más.
## Cicatrización normal vs. problemas
- Un poco de secreción clara o rosada, picazón leve y firmeza alrededor de la cicatriz son normales.
- Apertura de la herida, bordes separados o secreción abundante no lo son: llámenos.
> Fumar retrasa la cicatrización. Si fuma, este es el momento más importante para no hacerlo.`,
  },
  {
    slug: "pain-management-after-discharge",
    category: "discharge-instructions",
    sortOrder: 3,
    lastReviewed: reviewed,
    titleEn: "Pain Management After Discharge",
    titleEs: "Manejo del Dolor Después del Alta",
    summaryEn:
      "How to use your pain medicines safely, non-medicine strategies that help, and when to call about pain that is not controlled.",
    summaryEs:
      "Cómo usar sus medicamentos para el dolor de forma segura, estrategias sin medicamentos que ayudan y cuándo llamar por dolor no controlado.",
    keywords: "pain management, pain medicine, opioids, dolor, medicamentos para el dolor",
    contentEn: `Pain is normal after a procedure, but it should improve each day. Your goal is comfortable movement and sleep — not necessarily zero pain.
## Using your medicines safely
- Take medicines on the schedule your team prescribed, not only when pain is severe.
- Do not double up: many prescription pain pills already contain acetaminophen (Tylenol). Never exceed the acetaminophen limit given to you.
- Do not mix opioids with alcohol, sleep aids, or anxiety medicines unless your team approves.
- Opioids can cause constipation. Drink water, walk, and use a stool softener if recommended.
## Non-medicine strategies
- Ice the area 20 minutes at a time, with a cloth between ice and skin, several times a day.
- Elevate the limb above heart level when resting.
- Use pillows to support comfortable positions for sleep.
- Gentle movement, slow breathing, and distraction all measurably lower pain.
## Expect a normal pattern
- Pain is usually worst on days 1 to 3, then steadily improves.
- Brief spikes after therapy or extra activity are normal.
## Call us if
- Pain is not controlled even after taking your medicine as prescribed.
- Pain suddenly becomes much worse, especially with new numbness or color change in the limb.
- You run out of medicine early — call before the weekend.
> Most patients need opioid medicine for only a few days. Plan to step down to acetaminophen or ibuprofen as soon as your team says it is safe.`,
    contentEs: `El dolor es normal después de un procedimiento, pero debe mejorar cada día. Su objetivo es moverse y dormir con comodidad, no necesariamente tener dolor cero.
## Uso seguro de sus medicamentos
- Tome los medicamentos en el horario recetado por su equipo, no solo cuando el dolor sea intenso.
- No duplique: muchas pastillas recetadas para el dolor ya contienen acetaminofén (Tylenol). Nunca exceda el límite de acetaminofén que se le indicó.
- No mezcle opioides con alcohol, pastillas para dormir ni medicamentos para la ansiedad a menos que su equipo lo apruebe.
- Los opioides pueden causar estreñimiento. Beba agua, camine y use un ablandador de heces si se recomienda.
## Estrategias sin medicamentos
- Aplique hielo en la zona por 20 minutos cada vez, con una tela entre el hielo y la piel, varias veces al día.
- Eleve la extremidad por encima del nivel del corazón al descansar.
- Use almohadas para apoyar posiciones cómodas para dormir.
- El movimiento suave, la respiración lenta y la distracción reducen el dolor de forma medible.
## Espere un patrón normal
- El dolor suele ser peor los días 1 a 3 y luego mejora constantemente.
- Los picos breves después de la terapia o actividad extra son normales.
## Llámenos si
- El dolor no se controla ni siquiera tomando su medicamento como se recetó.
- El dolor empeora de repente, especialmente con entumecimiento nuevo o cambio de color en la extremidad.
- Se le acaba el medicamento antes de tiempo; llame antes del fin de semana.
> La mayoría de los pacientes necesitan medicamentos opioides solo por unos días. Planee cambiar a acetaminofén o ibuprofeno tan pronto como su equipo diga que es seguro.`,
  },
  {
    slug: "blood-clot-prevention-dvt",
    category: "discharge-instructions",
    sortOrder: 4,
    lastReviewed: reviewed,
    titleEn: "Preventing Blood Clots After Surgery (DVT Prevention)",
    titleEs: "Prevención de Coágulos Después de la Cirugía (Prevención de TVP)",
    summaryEn:
      "Simple steps that lower your risk of deep vein thrombosis after surgery, and the warning signs that need urgent care.",
    summaryEs:
      "Pasos simples que reducen el riesgo de trombosis venosa profunda después de la cirugía y las señales de alerta que requieren atención urgente.",
    keywords: "DVT, blood clot, blood thinner, TVP, coágulo, anticoagulante",
    contentEn: `Surgery and reduced activity can let blood pool in the legs, forming a clot (deep vein thrombosis, or DVT). A clot that travels to the lungs (pulmonary embolism) is dangerous. Prevention is simple and effective.
## Lower your risk
- Walk often. Several short walks a day are the single best prevention.
- Do ankle pumps: point and flex your feet 20 times each hour while awake.
- Drink water regularly unless you are on a fluid restriction.
- Wear compression stockings if they were prescribed, including during sleep if told to.
- If a blood thinner was prescribed, take every dose on time.
## Extra steps for travel
- On car rides over an hour, stop to walk every hour.
- On flights, walk the aisle or do ankle pumps each hour and stay hydrated.
## Signs of a leg clot — call us right away
- Swelling in one leg, calf, or ankle that is more than the other side.
- New calf pain or tenderness, especially when walking or touching.
- Warmth or redness over one calf.
## Signs of a lung clot — call 911 now
- Sudden shortness of breath.
- Chest pain that worsens with deep breaths.
- Rapid heartbeat, dizziness, or coughing up blood.
> Your risk is highest in the first two weeks after surgery but small clots can start before symptoms. Keep moving — it is the most powerful protection you control.`,
    contentEs: `La cirugía y la actividad reducida pueden hacer que la sangre se acumule en las piernas y forme un coágulo (trombosis venosa profunda o TVP). Un coágulo que viaja a los pulmones (embolia pulmonar) es peligroso. La prevención es simple y efectiva.
## Reduzca su riesgo
- Camine con frecuencia. Varias caminatas cortas al día son la mejor prevención.
- Haga ejercicios de tobillo: apunte y flexione los pies 20 veces cada hora mientras esté despierto.
- Beba agua con regularidad a menos que tenga restricción de líquidos.
- Use medias de compresión si se recetaron, incluso al dormir si se le indicó.
- Si se recetó un anticoagulante, tome cada dosis a tiempo.
## Medidas extra para viajar
- En viajes en auto de más de una hora, pare a caminar cada hora.
- En vuelos, camine por el pasillo o haga ejercicios de tobillo cada hora y manténgase hidratado.
## Señales de coágulo en la pierna: llámenos de inmediato
- Hinchazón en una pierna, pantorrilla o tobillo que es mayor que la del otro lado.
- Dolor o sensibilidad nueva en la pantorrilla, especialmente al caminar o tocar.
- Calor o enrojecimiento sobre una pantorrilla.
## Señales de coágulo en el pulmón: llame al 911 ahora
- Falta de aire repentina.
- Dolor de pecho que empeora con respiraciones profundas.
- Latidos rápidos, mareo o tos con sangre.
> Su riesgo es mayor en las primeras dos semanas después de la cirugía, pero los coágulos pequeños pueden comenzar antes de los síntomas. Siga moviéndose: es la protección más poderosa que usted controla.`,
  },
  {
    slug: "opioid-safety-at-home",
    category: "discharge-instructions",
    sortOrder: 5,
    lastReviewed: reviewed,
    titleEn: "Opioid Safety at Home: Use, Storage, and Disposal",
    titleEs: "Seguridad con Opioides en Casa: Uso, Almacenamiento y Eliminación",
    summaryEn:
      "How to take opioid pain medicine safely, store it away from children and others, and dispose of leftovers properly.",
    summaryEs:
      "Cómo tomar medicamentos opioides para el dolor de forma segura, guardarlos lejos de niños y otras personas, y desechar los sobrantes correctamente.",
    keywords: "opioid safety, narcotics, disposal, oxycodone, opioides, narcóticos",
    contentEn: `Opioid medicines (oxycodone, hydrocodone, tramadol, and others) help with short-term pain after surgery but carry real risks. A few habits keep you and your household safe.
## Taking them safely
- Take only the dose prescribed, only for the pain it was prescribed for.
- Never mix opioids with alcohol, sleep aids, anxiety medicines (like benzodiazepines), or other sedating drugs.
- Do not drive or operate equipment while taking opioids.
- Transition to non-opioid options — acetaminophen, ibuprofen, ice, elevation — as soon as your team says you can.
## Warning signs — call 911
- Slow, shallow, or stopped breathing.
- Cannot be woken up or extremely hard to wake.
- Blue or gray lips or fingernails.
## Storage
- Keep opioids in their original bottle, up high and out of sight — ideally locked.
- Never store them in bathrooms, kitchens, or cars where others may find them.
- Keep them away from children, teens, visitors, and pets.
## Disposal of leftovers
- The safest option is a drug take-back location or DEA take-back day. Our office can point you to the nearest one.
- If none is available, many opioids are on the FDA flush list — check the label.
- Otherwise, mix pills with coffee grounds or cat litter in a sealed bag and place in household trash. Remove your name from the bottle first.
> Most patients use only a few opioid pills. If you expect to need them longer than prescribed, talk with your team instead of stretching doses.`,
    contentEs: `Los medicamentos opioides (oxicodona, hidrocodona, tramadol y otros) ayudan con el dolor a corto plazo después de la cirugía, pero conllevan riesgos reales. Algunos hábitos mantienen seguros a usted y a su hogar.
## Tomarlos de forma segura
- Tome solo la dosis recetada, solo para el dolor para el que se recetó.
- Nunca mezcle opioides con alcohol, pastillas para dormir, medicamentos para la ansiedad (como benzodiacepinas) u otros sedantes.
- No conduzca ni opere equipos mientras tome opioides.
- Cambie a opciones sin opioides (acetaminofén, ibuprofeno, hielo, elevación) tan pronto como su equipo lo autorice.
## Señales de alerta: llame al 911
- Respiración lenta, superficial o detenida.
- No se puede despertar o es extremadamente difícil despertar a la persona.
- Labios o uñas azules o grises.
## Almacenamiento
- Guarde los opioides en su frasco original, en alto y fuera de la vista, idealmente bajo llave.
- Nunca los guarde en baños, cocinas ni autos donde otros puedan encontrarlos.
- Manténgalos lejos de niños, adolescentes, visitas y mascotas.
## Eliminación de sobrantes
- La opción más segura es un punto de devolución de medicamentos o una jornada de recolección de la DEA. Nuestra oficina puede indicarle el más cercano.
- Si no hay ninguno disponible, muchos opioides están en la lista de descarga por inodoro de la FDA; revise la etiqueta.
- De lo contrario, mezcle las pastillas con café molido o arena para gatos en una bolsa sellada y colóquela en la basura doméstica. Quite su nombre del frasco primero.
> La mayoría de los pacientes usan solo unas pocas pastillas de opioides. Si espera necesitarlos más tiempo del recetado, hable con su equipo en lugar de estirar las dosis.`,
  },
  {
    slug: "when-to-call-after-discharge",
    category: "discharge-instructions",
    sortOrder: 6,
    lastReviewed: reviewed,
    titleEn: "When to Call the Office After Discharge",
    titleEs: "Cuándo Llamar a la Oficina Después del Alta",
    summaryEn:
      "A quick-reference guide: what is normal, what needs a phone call during office hours, and what needs 911 or the emergency room.",
    summaryEs:
      "Una guía de referencia rápida: qué es normal, qué necesita una llamada en horario de oficina y qué necesita el 911 o la sala de emergencias.",
    keywords:
      "when to call, warning signs, emergency, cuándo llamar, señales de alerta, emergencia",
    contentEn: `Most recovery questions fit into three groups. When in doubt, call us — that is what we are here for.
## Usually normal
- Bruising that appears or spreads in the first week.
- Mild swelling that improves with elevation and ice.
- Feeling more tired than usual for one to two weeks.
- Small amounts of clear or pink drainage on the dressing.
- Tightness or itching around the healing incision.
## Call our office during office hours
- Fever of 100.4°F (38°C) or higher.
- Redness spreading from the incision, or foul-smelling drainage.
- Pain that is getting worse after the third day instead of better.
- Nausea, vomiting, or constipation that medicine does not fix.
- New numbness, weakness, or color change in the limb.
- Any question about medicines, dressings, or activity limits.
## Call 911 or go to the emergency room
- Chest pain, pressure, or trouble breathing.
- Coughing up blood or sudden rapid heartbeat.
- Fainting, new confusion, slurred speech, or one-sided weakness.
- Bleeding that soaks through dressings and does not stop with 10 minutes of firm pressure.
- Inability to wake someone who took sedating medicine.
## How to reach us
- Office: (844) 699-2273, Monday through Friday, 7:30 AM to 6:00 PM.
- After hours: call the office number and follow the prompts to reach the on-call provider.
- Patient portal: send a secure message for non-urgent questions.
> Save our number in your phone now, and make sure a family member has it too.`,
    contentEs: `La mayoría de las preguntas de recuperación encajan en tres grupos. En caso de duda, llámenos: para eso estamos.
## Generalmente normal
- Moretones que aparecen o se extienden en la primera semana.
- Hinchazón leve que mejora con elevación y hielo.
- Sentirse más cansado de lo normal durante una o dos semanas.
- Pequeñas cantidades de secreción clara o rosada en el vendaje.
- Tirantez o picazón alrededor de la incisión que sana.
## Llame a nuestra oficina en horario laboral
- Fiebre de 100.4°F (38°C) o más.
- Enrojecimiento que se extiende desde la incisión o secreción con mal olor.
- Dolor que empeora después del tercer día en lugar de mejorar.
- Náuseas, vómitos o estreñimiento que el medicamento no corrige.
- Entumecimiento nuevo, debilidad o cambio de color en la extremidad.
- Cualquier pregunta sobre medicamentos, vendajes o límites de actividad.
## Llame al 911 o vaya a la sala de emergencias
- Dolor o presión en el pecho, o dificultad para respirar.
- Tos con sangre o latidos rápidos repentinos.
- Desmayo, confusión nueva, dificultad para hablar o debilidad de un lado.
- Sangrado que empapa los vendajes y no se detiene con 10 minutos de presión firme.
- No poder despertar a alguien que tomó medicamento sedante.
## Cómo contactarnos
- Oficina: (844) 699-2273, de lunes a viernes, de 7:30 AM a 6:00 PM.
- Fuera del horario: llame al número de la oficina y siga las indicaciones para comunicarse con el proveedor de guardia.
- Portal del paciente: envíe un mensaje seguro para preguntas no urgentes.
> Guarde nuestro número en su teléfono ahora y asegúrese de que un familiar también lo tenga.`,
  },
];
