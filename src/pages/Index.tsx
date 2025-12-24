import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

type Cheat = {
  id: string;
  name: string;
  version: string;
  oldPrice: number;
  newPrice: number;
  servers: string[];
  description: string;
};

const cheats: Cheat[] = [
  {
    id: '1',
    name: 'Monoton',
    version: '1.12.2',
    oldPrice: 250,
    newPrice: 0,
    servers: ['FunTime', 'ReallyWorld'],
    description: 'Crack версия с полным функционалом'
  },
  {
    id: '2',
    name: 'Dimasik',
    version: '1.12.2',
    oldPrice: 350,
    newPrice: 0,
    servers: ['SpookyTime', 'HolyWorld'],
    description: 'Crack версия с расширенными возможностями'
  },
  {
    id: '3',
    name: 'RelakeDLC',
    version: '1.12.2',
    oldPrice: 100,
    newPrice: 0,
    servers: ['FunTime', 'ReallyWorld', 'SpookyTime'],
    description: 'Легкая версия для базовых функций'
  },
  {
    id: '4',
    name: 'Nursultan',
    version: '1.12.2',
    oldPrice: 863,
    newPrice: 0,
    servers: ['HolyWorld', 'FunTime'],
    description: 'Премиум функционал со всеми модулями'
  }
];

const updates = [
  {
    date: '20.12.2024',
    title: 'Обновление Monoton v2.5',
    description: 'Добавлена поддержка новых серверов и исправлены баги'
  },
  {
    date: '18.12.2024',
    title: 'Новый чит Nursultan',
    description: 'Выпущена премиум версия с расширенным функционалом'
  },
  {
    date: '15.12.2024',
    title: 'Скидки на все читы!',
    description: 'Все читы теперь доступны абсолютно бесплатно'
  }
];

export default function Index() {
  const [cart, setCart] = useState<Cheat[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const addToCart = (cheat: Cheat) => {
    if (!cart.find(item => item.id === cheat.id)) {
      setCart([...cart, cheat]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handlePayment = () => {
    setIsPaid(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleGoToFiles = () => {
    window.open('https://collapseloader.org/', '_blank');
    setIsCartOpen(false);
    setIsPaid(false);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 pointer-events-none" />
      
      <div className="relative z-10">
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-6xl mx-auto text-center animate-fade-in">
            <div className="inline-block mb-6">
              <Badge className="text-lg px-6 py-2 bg-primary/20 text-primary border-primary/50">
                🎮 Профессиональный магазин читов
              </Badge>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Minecraft Cheats
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Мощные читы для популярных серверов с расширенным функционалом.
              Все читы теперь доступны бесплатно!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="ShoppingCart" className="mr-2" size={20} />
                Перейти к каталогу
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-primary/50 hover:bg-primary/10"
                onClick={() => document.getElementById('updates')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="Bell" className="mr-2" size={20} />
                Последние обновления
              </Button>
            </div>
          </div>
        </section>

        <section id="catalog" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4">
              Каталог читов
            </h2>
            <p className="text-center text-muted-foreground mb-16 text-lg">
              Выберите подходящий чит для ваших серверов
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cheats.map((cheat, index) => (
                <Card 
                  key={cheat.id} 
                  className="p-6 bg-card border-primary/30 hover:border-primary/60 transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{cheat.name}</h3>
                      <Badge variant="outline" className="text-xs border-secondary/50 text-secondary">
                        {cheat.version}
                      </Badge>
                    </div>
                    <Icon name="Zap" className="text-primary" size={24} />
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">
                    {cheat.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cheat.servers.map(server => (
                      <Badge key={server} variant="secondary" className="text-xs">
                        {server}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-muted-foreground line-through">
                        {cheat.oldPrice}₽
                      </span>
                      <span className="text-3xl font-bold text-green-500">
                        {cheat.newPrice}₽
                      </span>
                    </div>
                    <Badge className="mt-2 bg-green-500/20 text-green-500 border-green-500/50">
                      🎉 Акция 100%
                    </Badge>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    onClick={() => addToCart(cheat)}
                  >
                    <Icon name="ShoppingCart" className="mr-2" size={16} />
                    Купить
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="updates" className="py-20 px-4 bg-card/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4">
              Последние обновления
            </h2>
            <p className="text-center text-muted-foreground mb-16 text-lg">
              Следите за новостями и улучшениями
            </p>
            
            <div className="space-y-6">
              {updates.map((update, index) => (
                <Card 
                  key={index} 
                  className="p-6 bg-card border-primary/30 hover:border-primary/60 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Icon name="Sparkles" className="text-primary" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{update.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {update.date}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{update.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-12 px-4 border-t border-primary/30">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-muted-foreground">
              © 2024 Minecraft Cheats Store. Все читы для образовательных целей.
            </p>
          </div>
        </footer>
      </div>

      {cart.length > 0 && (
        <Button
          className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg animate-glow"
          onClick={() => setIsCartOpen(true)}
        >
          <div className="relative">
            <Icon name="ShoppingCart" size={24} />
            <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-destructive">
              {cart.length}
            </Badge>
          </div>
        </Button>
      )}

      <Dialog open={isCartOpen} onOpenChange={(open) => {
        setIsCartOpen(open);
        if (!open) {
          setIsPaid(false);
        }
      }}>
        <DialogContent className="max-w-2xl bg-card">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              {isPaid ? 'Успешная оплата! 🎉' : 'Корзина'}
            </DialogTitle>
          </DialogHeader>
          
          {isPaid ? (
            <div className="text-center py-8">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-4">
                  <Icon name="Check" className="text-green-500" size={40} />
                </div>
                <p className="text-xl text-muted-foreground mb-8">
                  Ваши читы готовы к загрузке!
                </p>
              </div>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                onClick={handleGoToFiles}
              >
                <Icon name="Download" className="mr-2" size={20} />
                Перейти к файлам
              </Button>
            </div>
          ) : (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="ShoppingCart" className="mx-auto text-muted-foreground mb-4" size={48} />
                  <p className="text-muted-foreground">Корзина пуста</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-background rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-bold text-lg">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.version}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-sm text-muted-foreground line-through block">
                              {item.oldPrice}₽
                            </span>
                            <span className="text-xl font-bold text-green-500">
                              {item.newPrice}₽
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-primary/30 pt-4 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold">Итого:</span>
                      <div className="text-right">
                        <span className="text-lg text-muted-foreground line-through block">
                          {cart.reduce((sum, item) => sum + item.oldPrice, 0)}₽
                        </span>
                        <span className="text-3xl font-bold text-green-500">0₽</span>
                      </div>
                    </div>
                    <Button 
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                      onClick={handlePayment}
                    >
                      <Icon name="CreditCard" className="mr-2" size={20} />
                      Оплатить
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}