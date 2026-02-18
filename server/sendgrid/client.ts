// SendGrid Email Client - Replit Connector Integration
// Uses Replit's connector API for secure credential management
import sgMail from '@sendgrid/mail';

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  const connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=sendgrid',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key || !connectionSettings.settings.from_email)) {
    throw new Error('SendGrid not connected');
  }
  return { apiKey: connectionSettings.settings.api_key.trim(), email: connectionSettings.settings.from_email.trim() };
}

// WARNING: Never cache this client.
export async function getUncachableSendGridClient() {
  const { apiKey, email } = await getCredentials();
  sgMail.setApiKey(apiKey.trim());
  return {
    client: sgMail,
    fromEmail: email
  };
}

interface EnterpriseQuoteData {
  submissionId: string;
  customerType: string;
  projectType: string;
  planning: string;
  hasMeasurements: boolean;
  rooms: Array<{
    name: string;
    notes?: string;
    windows: Array<{
      label?: string;
      widthCm: number;
      heightCm: number;
      mountType?: string;
      quantity?: number;
    }>;
  }>;
  preferences: {
    productTypes: string[];
    lightControl?: string;
    style?: string;
    colorPref?: string;
    extraNotes?: string;
  };
  services: {
    selected?: string[];
    contactPref?: string;
    preferredTime?: string;
    region?: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street?: string;
    postalCode?: string;
    city?: string;
    country?: string;
    companyName?: string;
    vatNumber?: string;
  };
}

const planningLabels: Record<string, string> = {
  asap: "Zo snel mogelijk",
  "2-4w": "Binnen 2–4 weken",
  "1-2m": "Binnen 1–2 maanden",
  later: "Geen haast / later plannen",
};

const lightLabels: Record<string, string> = {
  transparant: "Transparant / decoratief",
  lichtdoorlatend: "Lichtdoorlatend",
  verduisterend: "Verduisterend",
  "weet-niet": "Weet ik niet",
};

const colorLabels: Record<string, string> = {
  neutraal: "Neutraal (wit / beige / grijs)",
  warm: "Warme tinten",
  donker: "Donkere tinten",
  aardetinten: "Aardetinten",
  geen: "Geen voorkeur",
};

const contactPrefLabels: Record<string, string> = {
  telefoon: "Telefoon",
  whatsapp: "WhatsApp",
  email: "E-mail",
};

const timeLabels: Record<string, string> = {
  ochtend: "Weekdag ochtend",
  namiddag: "Weekdag namiddag",
  avond: "Weekdag avond",
  zaterdag: "Zaterdag",
};

function esc(str: string | undefined | null): string {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function row(label: string, value: string | undefined | null): string {
  if (!value) return '';
  return `<tr><td style="padding:8px 12px;color:#666;font-size:14px;border-bottom:1px solid #f0f0f0;width:160px;"><strong>${esc(label)}</strong></td><td style="padding:8px 12px;color:#333;font-size:14px;border-bottom:1px solid #f0f0f0;">${esc(value)}</td></tr>`;
}

function sectionTitle(title: string): string {
  return `<h2 style="color:#2C3E50;border-bottom:2px solid #C4A36C;padding-bottom:8px;margin:28px 0 14px 0;font-size:18px;">${esc(title)}</h2>`;
}

export async function sendEnterpriseQuoteEmail(data: EnterpriseQuoteData) {
  try {
    const { client, fromEmail } = await getUncachableSendGridClient();

    const totalWindows = data.rooms.reduce((sum, r) => sum + r.windows.length, 0);

    let roomsHtml = '';
    data.rooms.forEach((room, ri) => {
      roomsHtml += `<div style="background:#fff;border:1px solid #e8e8e8;border-radius:8px;padding:16px;margin-bottom:12px;">`;
      roomsHtml += `<h3 style="color:#2C3E50;margin:0 0 8px 0;font-size:15px;">Ruimte ${ri + 1}: ${esc(room.name)}</h3>`;
      if (room.notes) {
        roomsHtml += `<p style="color:#888;font-size:13px;margin:0 0 10px 0;font-style:italic;">${esc(room.notes)}</p>`;
      }
      roomsHtml += `<table style="width:100%;border-collapse:collapse;">`;
      roomsHtml += `<tr style="background:#f8f8f8;"><th style="text-align:left;padding:6px 10px;font-size:12px;color:#666;">Raam</th><th style="text-align:left;padding:6px 10px;font-size:12px;color:#666;">Breedte</th><th style="text-align:left;padding:6px 10px;font-size:12px;color:#666;">Hoogte</th><th style="text-align:left;padding:6px 10px;font-size:12px;color:#666;">Montage</th><th style="text-align:left;padding:6px 10px;font-size:12px;color:#666;">Aantal</th></tr>`;
      room.windows.forEach((win, wi) => {
        roomsHtml += `<tr>`;
        roomsHtml += `<td style="padding:6px 10px;font-size:13px;color:#333;border-bottom:1px solid #f0f0f0;">${esc(win.label) || `Raam ${wi + 1}`}</td>`;
        roomsHtml += `<td style="padding:6px 10px;font-size:13px;color:#333;border-bottom:1px solid #f0f0f0;">${win.widthCm} cm</td>`;
        roomsHtml += `<td style="padding:6px 10px;font-size:13px;color:#333;border-bottom:1px solid #f0f0f0;">${win.heightCm} cm</td>`;
        roomsHtml += `<td style="padding:6px 10px;font-size:13px;color:#333;border-bottom:1px solid #f0f0f0;">${esc(win.mountType) || '—'}</td>`;
        roomsHtml += `<td style="padding:6px 10px;font-size:13px;color:#333;border-bottom:1px solid #f0f0f0;">${win.quantity || 1}</td>`;
        roomsHtml += `</tr>`;
      });
      roomsHtml += `</table></div>`;
    });

    const servicesSelected = data.services?.selected || [];
    const addressParts = [data.contact.street, data.contact.postalCode, data.contact.city, data.contact.country].filter(Boolean);

    const htmlContent = `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:700px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#2C3E50 0%,#1a2530 100%);padding:30px;text-align:center;">
          <h1 style="color:#C4A36C;margin:0;font-size:26px;letter-spacing:2px;">KANIOU</h1>
          <p style="color:#aaa;margin:6px 0 0 0;font-size:13px;">Nieuwe Enterprise Offerte Aanvraag</p>
        </div>

        <div style="background:#C4A36C;padding:12px 30px;display:flex;justify-content:space-between;">
          <span style="color:#fff;font-size:14px;font-weight:600;">Referentie: ${esc(data.submissionId)}</span>
          <span style="color:#fff;font-size:14px;">Datum: ${new Date().toLocaleDateString('nl-BE', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
        </div>

        <div style="padding:24px 30px;background:#fafafa;">

          ${sectionTitle('Klantgegevens')}
          <table style="width:100%;border-collapse:collapse;">
            ${row('Naam', `${data.contact.firstName} ${data.contact.lastName}`)}
            ${row('E-mail', data.contact.email)}
            ${row('Telefoon', data.contact.phone)}
            ${addressParts.length > 0 ? row('Adres', addressParts.join(', ')) : ''}
            ${row('Bedrijf', data.contact.companyName)}
            ${row('BTW-nummer', data.contact.vatNumber)}
          </table>

          ${sectionTitle('Projectinformatie')}
          <table style="width:100%;border-collapse:collapse;">
            ${row('Type klant', data.customerType)}
            ${row('Type project', data.projectType)}
            ${row('Planning', planningLabels[data.planning] || data.planning)}
            ${row('Maten beschikbaar', data.hasMeasurements ? 'Ja' : 'Nee — opmeting gewenst')}
            ${row('Totaal ruimtes', String(data.rooms.length))}
            ${row('Totaal ramen', String(totalWindows))}
          </table>

          ${sectionTitle(`Ruimtes & Ramen (${data.rooms.length} ruimte${data.rooms.length > 1 ? 's' : ''}, ${totalWindows} ${totalWindows > 1 ? 'ramen' : 'raam'})`)}
          ${roomsHtml}

          ${sectionTitle('Voorkeuren')}
          <table style="width:100%;border-collapse:collapse;">
            ${row('Producttypes', data.preferences.productTypes.join(', '))}
            ${row('Lichtinval', data.preferences.lightControl ? (lightLabels[data.preferences.lightControl] || data.preferences.lightControl) : undefined)}
            ${row('Stijl', data.preferences.style)}
            ${row('Kleurvoorkeur', data.preferences.colorPref ? (colorLabels[data.preferences.colorPref] || data.preferences.colorPref) : undefined)}
            ${row('Extra wensen', data.preferences.extraNotes)}
          </table>

          ${servicesSelected.length > 0 || data.services?.contactPref || data.services?.preferredTime || data.services?.region ? `
            ${sectionTitle('Diensten & Afspraak')}
            <table style="width:100%;border-collapse:collapse;">
              ${servicesSelected.length > 0 ? row('Gewenste diensten', servicesSelected.join(', ')) : ''}
              ${row('Contact via', data.services?.contactPref ? (contactPrefLabels[data.services.contactPref] || data.services.contactPref) : undefined)}
              ${row('Voorkeur moment', data.services?.preferredTime ? (timeLabels[data.services.preferredTime] || data.services.preferredTime) : undefined)}
              ${row('Regio', data.services?.region)}
            </table>
          ` : ''}
        </div>

        <div style="background:#2C3E50;padding:20px 30px;text-align:center;">
          <p style="color:#C4A36C;margin:0 0 4px 0;font-size:13px;font-weight:600;">KANIOU Zilvernaald</p>
          <p style="color:#999;margin:0;font-size:11px;">&copy; ${new Date().getFullYear()} — Premium Gordijnen & Raamdecoratie</p>
        </div>
      </div>
    `;

    const msg = {
      to: 'info@kaniou.be',
      from: fromEmail,
      subject: `Nieuwe Offerte #${data.submissionId} — ${data.customerType} — ${data.contact.firstName} ${data.contact.lastName} — ${data.preferences.productTypes.join(', ')}`,
      html: htmlContent,
      replyTo: data.contact.email
    };

    await client.send(msg);
    console.log(`✅ Enterprise quote email sent to info@kaniou.be (ref: ${data.submissionId})`);
    return { success: true };
  } catch (error) {
    console.error('❌ SendGrid enterprise quote email error:', error);
    throw error;
  }
}

export async function sendQuoteRequestEmail(quoteData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  productType: string;
  width?: string;
  height?: string;
  message?: string;
}) {
  try {
    const { client, fromEmail } = await getUncachableSendGridClient();

    const htmlContent = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:linear-gradient(135deg,#2C3E50 0%,#1a2530 100%);padding:30px;text-align:center;">
          <h1 style="color:#C4A36C;margin:0;font-size:28px;">KANIOU</h1>
          <p style="color:#999;margin:5px 0 0 0;font-size:14px;">Nieuwe Offerte Aanvraag</p>
        </div>
        <div style="padding:30px;background:#f9f9f9;">
          <table style="width:100%;border-collapse:collapse;">
            ${row('Naam', `${quoteData.firstName} ${quoteData.lastName}`)}
            ${row('E-mail', quoteData.email)}
            ${row('Telefoon', quoteData.phone)}
            ${row('Product', quoteData.productType)}
            ${quoteData.width ? row('Breedte', quoteData.width + ' cm') : ''}
            ${quoteData.height ? row('Hoogte', quoteData.height + ' cm') : ''}
          </table>
          ${quoteData.message ? `<p style="color:#333;line-height:1.6;background:white;padding:15px;border-radius:5px;margin-top:16px;">${esc(quoteData.message)}</p>` : ''}
        </div>
        <div style="background:#2C3E50;padding:20px;text-align:center;">
          <p style="color:#999;margin:0;font-size:12px;">&copy; ${new Date().getFullYear()} KANIOU Zilvernaald</p>
        </div>
      </div>
    `;

    const msg = {
      to: 'info@kaniou.be',
      from: fromEmail,
      subject: `Nieuwe Offerte Aanvraag - ${quoteData.productType} - ${quoteData.firstName} ${quoteData.lastName}`,
      html: htmlContent,
      replyTo: quoteData.email
    };

    await client.send(msg);
    console.log('✅ SendGrid email sent successfully for quote request');
    return { success: true };
  } catch (error) {
    console.error('❌ SendGrid email error:', error);
    throw error;
  }
}
