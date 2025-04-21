import jsPDF from 'jspdf';

const generateBreachPDF = (breachDetails, email) => {
    if (!breachDetails || breachDetails.length === 0) {
        alert('No breach details available to generate PDF.');
        return;
    }
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;
  const margin = 15;
  const lineHeight = 6;
  const primaryColor = 'rgb(52, 58, 64)';   // Dark grey
  const secondaryColor = 'rgb(108, 117, 125)'; // Medium grey
  const accentColor = 'rgb(0, 123, 255)';    // Blue
  const lightGrey = 'rgb(248, 249, 250)'; // Very light grey
  const borderColor = 'rgb(220, 220, 220)'; // Light border grey

  // --- Header ---
  pdf.setFontSize(22);
  pdf.setTextColor(primaryColor);
  pdf.text(`Breach Analysis for: ${email}`, margin, yPosition);
  yPosition += 15;

  pdf.setLineWidth(0.5);
  pdf.setDrawColor(primaryColor);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(12);
  pdf.setTextColor(secondaryColor);

  breachDetails.forEach((breach, index) => {
    yPosition += 10;

    // New page check
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 20;
    }

    // --- Breach Group ---
    pdf.setFillColor(lightGrey);
    pdf.rect(margin, yPosition - 8, pageWidth - 2 * margin, 10, 'F');

    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(primaryColor);
    pdf.text(`Breach ${index + 1}: ${breach.breach}`, margin + 5, yPosition);
    yPosition += 12;

    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(secondaryColor);

    const groupMargin = margin + 10; // Indent for the details group

    for (const key in breach) {
      if (breach.hasOwnProperty(key) && key !== 'breach') {
        const value = breach[key];
        const label = key.charAt(0).toUpperCase() + key.slice(1) + ':';
        const labelWidth = pdf.getTextWidth(label, { fontSize: 12, fontStyle: 'bold' });
        const availableWidth = pageWidth - 2 * groupMargin - 5; // Space for value

        pdf.setFont('helvetica', 'bold');
        pdf.text(label, groupMargin, yPosition);
        pdf.setFont('helvetica', 'normal');

        const textLines = pdf.splitTextToSize(value, availableWidth);
        let valueY = yPosition;
        textLines.forEach((line) => {
          pdf.text(line, groupMargin + labelWidth + 5, valueY);
          valueY += lineHeight;
        });
        yPosition = Math.max(yPosition + lineHeight, valueY + 2); // Ensure enough space
      }
    }

    // Subtle border around each breach group
    pdf.setDrawColor(borderColor);
    pdf.rect(margin, yPosition - 15, pageWidth - 2 * margin, yPosition - (yPosition - 15), 'S');

    yPosition += 10; // Add spacing after each breach group
  });

  // --- Footer ---
  pdf.setFontSize(10);
  pdf.setTextColor('rgb(150, 150, 150)');
  pdf.text('Breach Analysis Report', margin, pageHeight - 10);
  pdf.text(new Date().toLocaleDateString(), pageWidth - margin - pdf.getTextWidth(new Date().toLocaleDateString(), { fontSize: 10 }), pageHeight - 10);

  pdf.save(`breach_analysis_${email.replace('@', '_').replace('.', '_')}.pdf`);
};

export default generateBreachPDF;