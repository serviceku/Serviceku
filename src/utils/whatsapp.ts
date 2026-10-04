/**
 * Generates WhatsApp click-to-chat URL with clean message template
 */
export function getWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  // ensure international prefix for Indonesia (62)
  const finalNumber = cleanNumber.startsWith('0')
    ? '62' + cleanNumber.substring(1)
    : cleanNumber.startsWith('62')
    ? cleanNumber
    : '62' + cleanNumber;

  return `https://wa.me/${finalNumber}?text=${encodeURIComponent(message)}`;
}

export function createServiceOrderMessage(
  serviceName: string,
  price: string,
  customerCity?: string
): string {
  let text = `Halo Admin Serviceku, saya ingin booking/konsultasi layanan:\n\n`;
  text += `🛠️ *Jasa:* ${serviceName}\n`;
  text += `💰 *Estimasi Biaya:* ${price}\n`;
  if (customerCity) {
    text += `📍 *Lokasi/Wilayah:* ${customerCity}\n`;
  }
  text += `\nMohon info ketersediaan teknisi dan jadwal kunjungan ke tempat saya. Terima kasih!`;
  return text;
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}
