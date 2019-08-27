FROM ubuntu:bionic

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get install -y add-apt-key curl

RUN curl -sSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | \
      apt-key add -
RUN echo "deb https://deb.nodesource.com/node_10.x bionic main" > \
      /etc/apt/sources.list.d/nodesource.list
RUN echo "deb-src https://deb.nodesource.com/node_10.x bionic main" >> \
      /etc/apt/sources.list.d/nodesource.list
RUN apt-get update

# build-essential required for building gems.
# libbz2-dev required to build gulp gem dependencies.
# libtokyocabinet-dev required to build gulp gem dependencies.
# zlib1g-dev required for nokogiri gem which bundler installs.
RUN apt-get install -y build-essential git libbz2-dev libtokyocabinet-dev \
      locales nodejs ruby-dev rubygems zlib1g-dev
RUN apt-get dist-upgrade -y
RUN dpkg-reconfigure locales
RUN locale-gen en_US.UTF-8
RUN /usr/sbin/update-locale LANG=en_US.UTF-8
RUN echo 'en_US.UTF-8 UTF-8' >> /etc/locale.gen
RUN locale-gen
RUN npm install -g npm
RUN npm install -g bower gulp

# https://bundler.io/blog/2019/05/14/solutions-for-cant-find-gem-bundler-with-executable-bundle.html
RUN gem update --system
RUN gem install bundler

RUN git clone https://github.com/nvns/nvns.github.io
WORKDIR /nvns.github.io
RUN npm install --no-audit
RUN bundle install
RUN bundle update

CMD ["/bin/bash", "-c", "cd /nvns.github.io && LC_CTYPE=en_US.UTF-8 LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8 /usr/bin/gulp"]
