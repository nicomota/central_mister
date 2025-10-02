const fs = require('fs');

const files = [
  'src/main/webapp/app/entities/aprenda-utilizar/aprenda-utilizar.component.html',
  'src/main/webapp/app/entities/duvidas-frequentes/duvidas-frequentes.component.html',
];

files.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');

    // Read the original HTML to understand the structure
    const lines = content.split('\n');

    // For aprenda-utilizar: fix missing closing tags for sections
    if (file.includes('aprenda-utilizar')) {
      content = fs.readFileSync('aprenda_utilizar/aprenda.html', 'utf8');
      // Extract body content
      const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
      if (bodyMatch) {
        content = bodyMatch[1];
      }
      // Remove sidebar
      content = content.replace(/<div class="sidebar">[\s\S]*?<\/div>/i, '');
      // Remove scripts
      content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
      // Add jhi-sidebar
      content = '<jhi-sidebar></jhi-sidebar>\n\n' + content.trim();

      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ Fixed ${file}`);
    }

    // For duvidas-frequentes: fix accordion structure
    if (file.includes('duvidas-frequentes')) {
      content = fs.readFileSync('duvidas_frequentes/duvidas.html', 'utf8');
      // Extract body content
      const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
      if (bodyMatch) {
        content = bodyMatch[1];
      }
      // Remove sidebar
      content = content.replace(/<div class="sidebar">[\s\S]*?<\/div>/i, '');
      // Remove scripts
      content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
      // Add jhi-sidebar
      content = '<jhi-sidebar></jhi-sidebar>\n\n' + content.trim();

      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ Fixed ${file}`);
    }

  } catch (error) {
    console.error(`❌ Error fixing ${file}:`, error.message);
  }
});

console.log('\n✨ HTML tags fixed!');
